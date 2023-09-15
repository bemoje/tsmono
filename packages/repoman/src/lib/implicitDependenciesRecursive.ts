import { implicitDependencies } from './implicitDependencies'

export function implicitDependenciesRecursive(...packageNames: string[]): string[] {
  const result = new Set<string>()
  packageNames.forEach((name) => recurseOne(name).forEach((dep) => result.add(dep)))
  return [...result]
}

function recurseOne(packageName: string): Set<string> {
  const result = new Set<string>()
  function recurse(name: string) {
    result.add(name)
    for (const dep of implicitDependencies(name)) {
      if (!result.has(dep)) {
        recurse(dep)
      } else if (dep === packageName) {
        console.error(`Circular dependency detected: ${[...result, dep].join(' -> ')}`)
      }
    }
  }
  recurse(packageName)
  return result
}
