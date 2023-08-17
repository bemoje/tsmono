import fs from 'fs'
import path from 'path'

export function findPackageJson(): Record<string, any> | undefined {
  const pkg = path.join(__dirname, '..', 'package.json')
  if (fs.existsSync(pkg)) {
    return JSON.parse(fs.readFileSync(pkg, 'utf8'))
  }
  console.log({ pkgpath: pkg })
}
