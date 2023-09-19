import { implicitDependencies } from './implicitDependencies'

export function implicitDependenciesRecursive(...packageNames: string[]): string[] {
  const result = new Set<string>()
  packageNames.forEach((name) => recurseOne(name).forEach((dep) => result.add(dep)))
  return [...result]
}

function recurseOne(packageName: string): Set<string> {
  const result = new Set<string>([packageName])
  function recurse(name: string) {
    for (const dep of implicitDependencies(name)) {
      if (!result.has(dep)) {
        result.add(name)
        recurse(dep)
      } else if (dep === packageName) {
        console.error(`Circular dependency detected: ${[...result, dep].join(' -> ')}`)
      }
    }
  }
  recurse(packageName)
  result.delete(packageName)
  return result
}
