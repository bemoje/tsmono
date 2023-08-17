import { execBatch } from '../pkg/node/src/lib/execBatch'
import { getImportedExternal } from './util/getImportedExternal'
import { getPackages } from './util/getPackages'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const builtins = new Set(require('module').builtinModules)

getPackages().forEach(({ pkg, rootdir, name, pkgpath }) => {
  const imports = getImportedExternal(rootdir).filter((imp) => !builtins.has(imp))

  imports.forEach((imp) => {
    if (!pkg.dependencies[imp]) {
      console.log(`${name} was missing dependency: ${imp}`)
      execBatch([`cd ${rootdir}`, `npm install --save ${imp}${imp.startsWith('@bemoje/') ? '@latest' : ''}`])
    }
  })

  Object.keys(pkg.dependencies).forEach((dep) => {
    if (!imports.includes(dep)) {
      console.log(`${name} had unused dependency: ${dep}`)
      execBatch([`cd ${rootdir}`, `npm uninstall ${dep}`])
    }
  })
})
