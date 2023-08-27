import fs from 'fs'
import path from 'path'
import { execBatch } from '../../packages/node/src'
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
        execBatch([`cd ${cwd}`, `npm run install ${name} ${imp}`])
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
  // const map = new Map()
  // const dmap = new Map()
  // getPackages().forEach(({ pkg, rootdir, name, pkgpath }) => {
  //   // deps
  //   for (const dep of Object.keys(pkg.dependencies)) {
  //     if (!map.has(dep)) map.set(dep, {})
  //     const o = map.get(dep)
  //     if (o[dep]) {
  //       if (o[dep] !== pkg.dependencies[dep]) {
  //         console.log(`${name} had different version of ${dep}: ${o[dep]} vs ${pkg.dependencies[dep]}`)
  //         pkg.dependencies[dep] = o[dep]
  //         fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
  //         execBatch([`cd ${rootdir}`, `npm update ${dep}`])
  //       }
  //     } else {
  //       if (rootpkg().dependencies[dep]) {
  //         o[dep] = rootpkg().dependencies[dep]
  //         if (pkg.dependencies[dep] !== rootpkg().dependencies[dep]) {
  //           console.log(
  //             `${name} had different version of ${dep}: ${pkg.dependencies[dep]} vs ${rootpkg().dependencies[dep]}`,
  //           )
  //           pkg.dependencies[dep] = rootpkg().dependencies[dep]
  //           fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
  //           execBatch([`cd ${rootdir}`, `npm update ${dep}`])
  //         }
  //       } else {
  //         execBatch([`cd ${cwd}`, `npm install --save ${dep}`])
  //         pkg.dependencies[dep] = rootpkg().dependencies[dep]
  //         o[dep] = pkg.dependencies[dep]
  //         fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
  //         execBatch([`cd ${rootdir}`, `npm update ${dep}`])
  //       }
  //     }
  //     map.set(dep, o)
  //   }
  //   // dev
  //   for (const dep of Object.keys(pkg.devDependencies)) {
  //     if (!dmap.has(dep)) dmap.set(dep, {})
  //     const o = dmap.get(dep)
  //     if (o[dep]) {
  //       if (o[dep] !== pkg.devDependencies[dep]) {
  //         console.log(`${name} had different version of ${dep}: ${o[dep]} vs ${pkg.devDependencies[dep]}`)
  //         pkg.devDependencies[dep] = o[dep]
  //         fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
  //         execBatch([`cd ${rootdir}`, `npm update ${dep}`])
  //       }
  //     } else {
  //       if (rootpkg().devDependencies[dep]) {
  //         o[dep] = rootpkg().devDependencies[dep]
  //         if (pkg.devDependencies[dep] !== rootpkg().devDependencies[dep]) {
  //           console.log(
  //             `${name} had different version of ${dep}: ${pkg.devDependencies[dep]} vs ${
  //               rootpkg().devDependencies[dep]
  //             }`,
  //           )
  //           pkg.devDependencies[dep] = rootpkg().devDependencies[dep]
  //           fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
  //           execBatch([`cd ${rootdir}`, `npm update ${dep}`])
  //         }
  //       } else {
  //         execBatch([`cd ${cwd}`, `npm install --save-dev ${dep}`])
  //         pkg.devDependencies[dep] = rootpkg().devDependencies[dep]
  //         o[dep] = pkg.devDependencies[dep]
  //         fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
  //         execBatch([`cd ${rootdir}`, `npm update ${dep}`])
  //       }
  //     }
  //     dmap.set(dep, o)
  //   }
  // })

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
