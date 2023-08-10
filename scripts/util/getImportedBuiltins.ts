import { strUnwrap, tsExtractImports } from '@bemoje/node-util'
import fs from 'fs'
import path from 'path'
import { walkTsFiles } from './walkTsFiles'

export function getImportedBuiltins(pkgroot: string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const builtins = new Set(require('module').builtinModules)
  const srcdir = path.join(pkgroot, 'src')
  const fpaths = walkTsFiles(srcdir, (fpath) => !/node_modules/i.test(fpath))
  const imports: Set<string> = new Set()
  fpaths.forEach((fpath) => {
    tsExtractImports(fs.readFileSync(fpath, 'utf8')).forEach(({ match }) => {
      const imp = strUnwrap(match.substring(match.indexOf('from ') + 5).trim(), "'", "'")
      if (builtins.has(imp)) imports.add(imp)
    })
  })
  return [...imports]
}
