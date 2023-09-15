import { getPackages } from './getPackages'

export function implicitDependents(...packages: string[]): string[] {
  const scopedNames = packages.map((pkg) => '@bemoje/' + pkg)
  const result = new Set<string>()
  for (const scopedName of scopedNames) {
    for (const { name, pkg } of getPackages()) {
      if (Object.keys(pkg.dependencies || {}).includes(scopedName)) {
        result.add(name)
      }
    }
  }
  return [...result]
}
