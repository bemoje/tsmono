import fs from 'fs'
import path from 'path'
import walkdir from 'walkdir'
import { strHashToStringDJB2 } from '../../pkg/string/src/string/strHashToStringDJB2'

export function hashPackage(name: string): number {
  const pkgPath = path.join(process.cwd(), 'pkg', name, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  delete pkg.scripts
  delete pkg.devDependencies
  delete pkg.version
  delete pkg.main
  const pkghash = strHashToStringDJB2(JSON.stringify(pkg))

  const srcdir = path.join(process.cwd(), 'pkg', name, 'src')
  const npmignorePath = path.join(process.cwd(), 'pkg', name, '.npmignore')
  const readmePath = path.join(process.cwd(), 'pkg', name, 'README.md')

  const fpaths = walkdir
    .sync(srcdir)
    .concat([npmignorePath, readmePath])
    .sort()
    .filter((fpath) => fs.statSync(fpath).isFile())

  const hashes = fpaths
    .map((fpath) => {
      let str = ''
      try {
        str = fs.readFileSync(fpath, 'utf8').replace(/[\r\n\t\s ;,]/g, '_')
      } catch (error) {
        //
      }
      return strHashToStringDJB2(str || '')
    })
    .concat(pkghash)

  return strHashToStringDJB2(hashes.map((n) => n.toString(36)).join(name))
}
