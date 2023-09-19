import fs from 'fs'
import path from 'path'

export function allPackageNames() {
  const ppath = path.join(process.cwd(), 'packages')
  return fs.readdirSync(ppath).filter((name) => {
    if (name.startsWith('.')) return false
    const fpath = path.join(ppath, name)
    return fs.statSync(fpath).isDirectory()
  })
}
