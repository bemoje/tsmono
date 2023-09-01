import fs from 'fs'
import path from 'path'
import { execBatch } from '../../packages/node/src/lib/execBatch'
import { getImportedExternal } from './getImportedExternal'
import { getPackages } from './getPackages'

const cwd = process.cwd()
let rootpkg = () => JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'))

export function fixDependencies() {
  // ensure all package.json files have the dependencies property
  getPackages().forEach(({ pkg, rootdir, name, pkgpath }) => {
    if (!pkg.dependencies) {
      pkg.dependencies = {}
    }
    if (!pkg.devDependencies) {
      pkg.devDependencies = {}
    }
    fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
  })

  // ensure all dependencies are installed
  const builtins = new Set(require('module').builtinModules)
  getPackages().forEach(({ pkg, rootdir, name, pkgpath }) => {
    const impext = getImportedExternal(rootdir)
    const filter = (imp) => !builtins.has(imp)

    const imports = impext.imports.filter(filter)
    imports.forEach((imp) => {
      if (!pkg.dependencies[imp]) {
        console.log(`${name} was missing dependency: ${imp}`)
        execBatch([`cd ${rootdir}`, `npm i ${imp}`])
      }
    })
    Object.keys(pkg.dependencies).forEach((dep) => {
      if (!imports.includes(dep) && dep !== 'tslib') {
        console.log(`${name} had unused dependency: ${dep}`)
        execBatch([`cd ${rootdir}`, `npm uninstall ${dep}`])
      }
    })
  })

  // ensure all own-dependencies are set to latest
  getPackages().forEach(({ pkg, rootdir, name, pkgpath }) => {
    for (const dep of Object.keys(pkg.dependencies)) {
      if (dep.startsWith('@bemoje') && pkg.dependencies[dep] !== 'latest') {
        console.log(`${name} not using latest of: ${dep}`)
        pkg.dependencies[dep] = 'latest'
        fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
        execBatch([`cd ${rootdir}`, `npm update ${dep}`])
      }
    }
  })

  // ensure all implicit dependencies are in nx.json
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
