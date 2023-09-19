import { implicitDependents } from './implicitDependents'

export function implicitDependentsRecursive(...packages: string[]): string[] {
  const result = new Set<string>()
  function recurse(name: string) {
    for (const dep of implicitDependents(name)) {
      if (!result.has(dep)) {
        result.add(dep)
        recurse(dep)
      } else if (dep === name) {
        console.error(`Circular dependency detected: ${[...result, dep].join(' -> ')}`)
      }
    }
  }
  for (const name of packages) {
    recurse(name)
  }
  return [...result]
}
