import fs from 'fs'
import path from 'path'
import { tsExtractImports } from '../../packages/tscode/src/lib/tsExtractImports'
import { strUnwrap } from '../../packages/util/src/string/strUnwrap'
import { walkTsFiles } from './walkTsFiles'

export function getImported(pkgroot: string): { imports: string[]; typeImports: string[] } {
  const srcdir = path.join(pkgroot, 'src')
  const fpaths = walkTsFiles(srcdir)
  const imports: Set<string> = new Set()
  const typeImports: Set<string> = new Set()
  fpaths.forEach((fpath) => {
    tsExtractImports(fs.readFileSync(fpath, 'utf8')).forEach(({ match }) => {
      const imp = strUnwrap(match.substring(match.indexOf('from ') + 5).trim(), "'", "'")
      if (match.startsWith('import type')) {
        typeImports.add(imp)
      } else {
        imports.add(imp)
      }
    })
  })
  const result = { imports: [...imports].sort(), typeImports: [...typeImports].sort() }
  return result
}
