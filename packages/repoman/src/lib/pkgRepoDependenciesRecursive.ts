import { pkgRepoDependencies } from './pkgRepoDependencies'

export function pkgRepoDependenciesRecursive(pkg: Record<string, any>): string[] {
  function recurse(pkg: Record<string, any>, deps: string[]): string[] {
    const newDeps = pkgRepoDependencies(pkg)
    if (newDeps.length === 0) {
      return deps
    }
    return recurse(pkg, deps.concat(newDeps))
  }
  return [...new Set(recurse(pkg, []))]
}
