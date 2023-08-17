import fs from 'fs'
import path from 'path'
import { IPackageDetails } from './IPackageDetails'
import { pkgRepoDependencies } from './pkgRepoDependencies'

export function getPackages(): IPackageDetails[] {
  const packages = path.join(process.cwd(), 'pkg')
  return fs
    .readdirSync(packages)
    .filter((n) => n !== 'index.ts')
    .map((name) => {
      const rootdir = path.join(packages, name)
      const pkgpath = path.join(rootdir, 'package.json')
      const pkg = JSON.parse(fs.readFileSync(pkgpath, 'utf8'))
      const deps = pkgRepoDependencies(pkg)
      return { name, rootdir, pkgpath, pkg, deps }
    })
}
