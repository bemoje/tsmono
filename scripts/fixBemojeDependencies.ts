import fs from 'fs'
import { getImportedBemoje } from './util/getImportedBemoje'
import { getPackages } from './util/getPackages'

getPackages().forEach(({ pkg, rootdir, name, pkgpath }) => {
  const imports = getImportedBemoje(rootdir)

  imports
    .filter((imp) => imp !== '@bemoje/node-util')
    .forEach((imp) => {
      if (!pkg.dependencies[imp]) {
        pkg.dependencies[imp] = 'latest'
        console.log(`${name} was missing dependency: ${imp}`)
      }
    })

  Object.keys(pkg.dependencies).forEach((dep) => {
    if (!dep.startsWith('@bemoje/')) return
    if (!imports.includes(dep)) {
      Reflect.deleteProperty(pkg.dependencies, dep)
      console.log(`${name} had unused dependency: ${dep}`)
    }
  })

  fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2))
})
