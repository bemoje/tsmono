import fs from 'fs'
import path from 'path'
import walkdir from 'walkdir'
import { strHashToStringDJB2 } from '../../pkg/string/src/string/strHashToStringDJB2'

export function hashPackage(name: string, scripts: string[]): [string, number][] {
  const dpath = path.join(process.cwd(), 'pkg', name)
  const fpaths = walkdir
    .sync(dpath, {
      filter: (dpath: string, files: string[]): string[] => {
        if (/node_modules|docs/i.test(dpath)) return []
        return files.filter((file) => !/package-lock.json/i.test(file))
      },
    })
    .sort()
    .filter((fpath) => fs.statSync(fpath).isFile())
  const hashes = fpaths.map((fpath) => {
    let str = ''
    try {
      str = fs.readFileSync(fpath, 'utf8')
    } catch (error) {
      //
    }
    return str ? strHashToStringDJB2(str) : 0
  })
  return scripts.map((script) => [script, strHashToStringDJB2(hashes.map((n) => n.toString(16)).join(script))])
}
