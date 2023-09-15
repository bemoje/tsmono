import { readJsonFileSync } from '@bemoje/util'
import path from 'path'
import { IPackageJson } from './types/IPackageJson'

export function implicitDependencies(pkg: IPackageJson | string): string[] {
  let _pkg: IPackageJson
  if (typeof pkg === 'string') {
    _pkg = readJsonFileSync(path.join(process.cwd(), 'packages', pkg, 'package.json')) as IPackageJson
  } else {
    _pkg = pkg
  }
  if (!_pkg.dependencies) return []
  return Object.keys(_pkg.dependencies)
    .filter((dep) => dep.startsWith('@bemoje/'))
    .map((dep) => dep.replace('@bemoje/', ''))
}
