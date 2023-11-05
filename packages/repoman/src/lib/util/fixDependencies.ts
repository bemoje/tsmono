import { colors, execute, readJsonFileSync, updateJsonFileSync } from '@bemoje/util'
import fs from 'fs-extra'
import path from 'path'
import { getImportedAllNonRelative } from './getImportedAllNonRelative'
import { getPackages } from './getPackages'
const { gray, magenta: green } = colors

const cwd = process.cwd()

export function fixDependencies() {
  console.log(green('Fixing dependencies...'))
  const status = (msg: string) => console.log(gray('- ' + msg))

  status('ensuring all package.json files have the dependencies property')
  getPackages().forEach(({ pkg, pkgpath }) => {
    if (!pkg.dependencies) pkg.dependencies = {}
    if (!pkg.devDependencies) pkg.devDependencies = {}
    fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
  })

  status('ensuring all dependencies are installed')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const builtins = new Set(require('module').builtinModules)
  getPackages().forEach(({ pkg, rootdir, name }) => {
    const impext = getImportedAllNonRelative(rootdir)
    const filter = (imp: string) => !builtins.has(imp)

    const imports = impext.imports.filter(filter)
    imports.forEach((imp) => {
      if (!(pkg.dependencies || {})[imp]) {
        console.log(`${name} was missing dependency: ${imp}`)
        execute(`npm i ${imp}`, {
          cwd: rootdir,
        })
      }
    })
    Object.keys(pkg.dependencies || {}).forEach((dep) => {
      if (!imports.includes(dep) && dep !== 'tslib') {
        console.log(`${name} had unused dependency: ${dep}`)
        execute(`npm uninstall ${dep}`, {
          cwd: rootdir,
        })
      }
    })
  })

  status('ensuring all own-dependencies are set to latest')
  getPackages().forEach(({ pkg, rootdir, name, pkgpath }) => {
    if (!pkg.dependencies) return
    for (const dep of Object.keys(pkg.dependencies)) {
      if (dep.startsWith('@bemoje') && pkg.dependencies[dep] !== 'latest') {
        console.log(`${name} not using latest of: ${dep}`)
        pkg.dependencies[dep] = 'latest'
        fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
        execute(`npm update ${dep}`, {
          cwd: rootdir,
        })
      }
    }
  })

  status('ensuring all implicit dependencies are updated in nx.json')
  const nxJsonPath = path.join(cwd, 'nx.json')
  updateJsonFileSync(nxJsonPath, (nxJson: Record<string, unknown>) => {
    if (!nxJson.projects) throw new Error('Could not find projects in nx.json')
    const nxProjects = nxJson.projects as Record<string, unknown>
    getPackages().forEach(({ pkg, name, rootdir }) => {
      if (!nxProjects[name]) {
        nxProjects[name] = {
          tags: [],
          implicitDependencies: [],
          npmScope: 'bemoje',
          projectType: 'library',
        }
      }
      const nxProject = nxProjects[name] as Record<string, unknown>
      const project: Record<string, unknown> = readJsonFileSync(path.join(rootdir, 'project.json'))
      if (!project.projectType) throw new Error('Could not find projectType in project.json for package: ' + name)
      nxProject.projectType = project.projectType
      nxProject.implicitDependencies = Object.keys(pkg.dependencies || {})
        .filter((dep) => dep.startsWith('@bemoje'))
        .map((dep) => dep.replace('@bemoje/', ''))
    })
    return nxJson
  })
}
