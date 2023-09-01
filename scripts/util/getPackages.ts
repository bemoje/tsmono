import fs from 'fs'
import path from 'path'
import { IPackageDetails } from '../types/IPackageDetails'
import { pkgRepoDependencies } from './pkgRepoDependencies'

export function getPackages(): IPackageDetails[] {
  const packages = path.join(process.cwd(), 'packages')
  const dist = path.join(process.cwd(), 'dist', 'packages')
  return fs
    .readdirSync(packages)
    .filter((n) => n !== 'index.ts' && n !== '.gitkeep')
    .map((name) => {
      const rootdir = path.join(packages, name)
      const pkgpath = path.join(rootdir, 'package.json')
      const pkg = fs.existsSync(pkgpath) ? JSON.parse(fs.readFileSync(pkgpath, 'utf8')) : {}
      const deps = pkgRepoDependencies(pkg)
      const distdir = path.join(dist, name)
      return { name, rootdir, pkgpath, pkg, deps, distdir }
    })
}
