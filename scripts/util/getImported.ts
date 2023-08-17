import fs from 'fs'
import path from 'path'
import { strUnwrap } from '../../pkg/string/src/string/strUnwrap'
import { tsExtractImports } from '../../pkg/tscode/src/lib/tsExtractImports'
import { walkTsFiles } from './walkTsFiles'

export function getImported(pkgroot: string) {
  const srcdir = path.join(pkgroot, 'src')
  const fpaths = walkTsFiles(srcdir)
  const imports: Set<string> = new Set()
  fpaths.forEach((fpath) => {
    tsExtractImports(fs.readFileSync(fpath, 'utf8')).forEach(({ match }) => {
      const imp = strUnwrap(match.substring(match.indexOf('from ') + 5).trim(), "'", "'")
      imports.add(imp)
    })
  })
  return [...imports].sort()
}
