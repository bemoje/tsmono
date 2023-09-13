import { pkgRepoDependencies } from './pkgRepoDependencies'

export function pkgRepoDependenciesRecursive(...packageNames: string[]): string[] {
  const result = new Set<string>()
  function recurse(name: string) {
    result.add(name)
    for (const dep of pkgRepoDependencies(name)) {
      if (!result.has(dep)) recurse(dep)
    }
  }
  packageNames.forEach(recurse)
  return [...result]
}
