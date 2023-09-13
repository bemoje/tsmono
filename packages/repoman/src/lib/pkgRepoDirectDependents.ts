import { getPackages } from './getPackages'

export function pkgRepoDirectDependents(...packages: string[]): string[] {
  packages = packages.map((pkg) => '@bemoje/' + pkg)
  const result = new Set<string>()
  getPackages().forEach(({ name, pkg }) => {
    if (!pkg.dependencies) return
    Object.keys(pkg.dependencies).forEach((dep) => {
      if (packages.includes(dep)) {
        result.add(name)
      }
    })
  })
  return [...result]
}
