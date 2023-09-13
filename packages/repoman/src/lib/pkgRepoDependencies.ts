import { readJsonFileSync } from '@bemoje/util'
import path from 'path'

export function pkgRepoDependencies(pkg: Record<string, unknown> | string): string[] {
  let _pkg: Record<string, unknown>
  if (typeof pkg === 'string') {
    _pkg = readJsonFileSync(path.join(process.cwd(), 'packages', pkg, 'package.json')) as Record<string, unknown>
  } else {
    _pkg = pkg
  }
  if (!_pkg.dependencies) return []
  return Object.keys(_pkg.dependencies)
    .filter((dep) => dep.startsWith('@bemoje/'))
    .map((dep) => dep.replace('@bemoje/', ''))
}
