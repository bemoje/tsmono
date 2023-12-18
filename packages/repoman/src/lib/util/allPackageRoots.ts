import fs from 'fs-extra'
import path from 'path'

export function allPackageRoots(packages?: string[]) {
  const ppath = path.join(process.cwd(), 'packages')
  if (packages) return packages.map((name) => path.join(ppath, name))
  return fs
    .readdirSync(ppath)
    .map((name) => {
      return path.join(ppath, name)
    })
    .filter((fpath) => {
      return fs.statSync(fpath).isDirectory()
    })
}
