import fs from 'fs'
import path from 'path'
import { pkgRepoDependencies } from './pkgRepoDependencies'
import { IPackageDetails } from './types/IPackageDetails'

export function getPackages(names?: string[]): IPackageDetails[] {
  const packages = path.join(process.cwd(), 'packages')
  const dist = path.join(process.cwd(), 'dist', 'packages')
  return fs
    .readdirSync(packages)
    .filter((n) => n !== 'index.ts' && !n.startsWith('.') && (!names || names.includes(n)))
    .map((name) => {
      const rootdir = path.join(packages, name)
      const pkgpath = path.join(rootdir, 'package.json')
      const pkg = fs.existsSync(pkgpath) ? JSON.parse(fs.readFileSync(pkgpath, 'utf8')) : {}
      const owndeps = pkgRepoDependencies(pkg)
      const distdir = path.join(dist, name)
      return { name, rootdir, pkgpath, pkg, owndeps, distdir }
    })
}
