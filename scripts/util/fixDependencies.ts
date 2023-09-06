import fs from 'fs'
import path from 'path'
import colors from '../../packages/util/src/node/colors'
import { executeBatchScript } from '../../packages/util/src/node/virtual-script/executeBatchScript'
import { getImportedAllNonRelative } from './getImportedAllNonRelative'
import { getPackages } from './getPackages'
const { gray, green } = colors

const cwd = process.cwd()

export function fixDependencies() {
  console.log(green('Fixing dependencies...'))
  const status = (msg: string) => console.log(gray('- ' + msg))

  status('ensuring all package.json files have the dependencies property')
  getPackages().forEach(({ pkg, rootdir, name, pkgpath }) => {
    if (!pkg.dependencies) pkg.dependencies = {}
    if (!pkg.devDependencies) pkg.devDependencies = {}
    fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
  })

  status('ensuring all dependencies are installed')
  const builtins = new Set(require('module').builtinModules)
  getPackages().forEach(({ pkg, rootdir, name, pkgpath }) => {
    const impext = getImportedAllNonRelative(rootdir)
    const filter = (imp) => !builtins.has(imp)

    const imports = impext.imports.filter(filter)
    imports.forEach((imp) => {
      if (!pkg.dependencies[imp]) {
        console.log(`${name} was missing dependency: ${imp}`)
        executeBatchScript([`npm i ${imp}`], {
          prependWithCall: true,
          cwd: rootdir,
        })
      }
    })
    Object.keys(pkg.dependencies).forEach((dep) => {
      if (!imports.includes(dep) && dep !== 'tslib') {
        console.log(`${name} had unused dependency: ${dep}`)
        executeBatchScript([`npm uninstall ${dep}`], {
          prependWithCall: true,
          cwd: rootdir,
        })
      }
    })
  })

  status('ensuring all own-dependencies are set to latest')
  getPackages().forEach(({ pkg, rootdir, name, pkgpath }) => {
    for (const dep of Object.keys(pkg.dependencies)) {
      if (dep.startsWith('@bemoje') && pkg.dependencies[dep] !== 'latest') {
        console.log(`${name} not using latest of: ${dep}`)
        pkg.dependencies[dep] = 'latest'
        fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
        executeBatchScript([`npm update ${dep}`], {
          prependWithCall: true,
          cwd: rootdir,
        })
      }
    }
  })

  status('ensuring all implicit dependencies are updated in nx.json')
  const nxJsonPath = path.join(cwd, 'nx.json')
  const nxJson = JSON.parse(fs.readFileSync(nxJsonPath, 'utf8'))
  getPackages().forEach(({ pkg, rootdir, name, pkgpath }) => {
    if (!nxJson.projects[name]) {
      nxJson.projects[name] = {
        tags: [],
        implicitDependencies: [],
        npmScope: 'bemoje',
        projectType: 'library',
      }
    }
    nxJson.projects[name].implicitDependencies = Object.keys(pkg.dependencies)
      .filter((dep) => dep.startsWith('@bemoje'))
      .map((dep) => dep.replace('@bemoje/', ''))
  })
  fs.writeFileSync(nxJsonPath, JSON.stringify(nxJson, null, 2), 'utf8')
}
