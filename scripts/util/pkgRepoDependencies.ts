export function pkgRepoDependencies(pkg: Record<string, any>): string[] {
  return Object.keys(pkg.dependencies)
    .filter((dep) => dep.startsWith('@bemoje/'))
    .map((dep) => dep.substring(8))
}
