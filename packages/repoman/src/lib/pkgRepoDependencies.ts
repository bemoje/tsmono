export function pkgRepoDependencies(pkg: Record<string, any>): string[] {
  if (!pkg.dependencies) return []
  return Object.keys(pkg.dependencies)
    .filter((dep) => dep.startsWith('@bemoje/'))
    .map((dep) => dep.replace('@bemoje/', ''))
}
