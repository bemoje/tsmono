import { strUnwrap } from '@bemoje/string'
import { tsExtractImports } from '@bemoje/tscode'
import fs from 'fs'
import path from 'path'
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
