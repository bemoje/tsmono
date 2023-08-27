import fs from 'fs'
import path from 'path'
import { execBatch } from '../../packages/node/src'
import { getImportedExternal } from './getImportedExternal'
import { getPackages } from './getPackages'

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
        execBatch([`cd ${rootdir}`, `npm install --save ${imp}${imp.includes('@bemoje/') ? '*' : ''}`])
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

  // ensure all packages use same versions of dependencies
  let rootpkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
  const map = new Map()
  getPackages().forEach(({ pkg, rootdir, name, pkgpath }) => {
    // deps
    for (const dep of Object.keys(pkg.dependencies)) {
      if (!map.has(dep)) map.set(dep, {})
      const o = map.get(dep)
      if (o[dep]) {
        if (o[dep] !== pkg.dependencies[dep]) {
          console.log(`${name} had different version of ${dep}: ${o[dep]} vs ${pkg.dependencies[dep]}`)
          pkg.dependencies[dep] = o[dep]
          fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
          execBatch([`cd ${rootdir}`, `npm update ${dep}`])
        }
      } else {
        if (rootpkg.dependencies[dep]) {
          o[dep] = rootpkg.dependencies[dep]
          if (pkg.dependencies[dep] !== rootpkg.dependencies[dep]) {
            console.log(
              `${name} had different version of ${dep}: ${pkg.dependencies[dep]} vs ${rootpkg.dependencies[dep]}`,
            )
            pkg.dependencies[dep] = rootpkg.dependencies[dep]
            fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
            execBatch([`cd ${rootdir}`, `npm update ${dep}`])
          }
        } else {
          execBatch([`cd ${process.cwd}`, `npm install --save ${dep}`])
          rootpkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
          pkg.dependencies[dep] = rootpkg.dependencies[dep]
          o[dep] = pkg.dependencies[dep]

          fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
          execBatch([`cd ${rootdir}`, `npm update ${dep}`])
        }
      }
    }
    // dev
    for (const dep of Object.keys(pkg.devDependencies)) {
      if (!rootpkg.devDependencies[dep]) {
        execBatch([`cd ${process.cwd}`, `npm install --save-dev ${dep}`])
        rootpkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
      }
    }
    pkg.devDependencies = {}
    fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
  })

  // ensure all implicit dependencies are in nx.json
  const nxJsonPath = path.join(process.cwd(), 'nx.json')
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
