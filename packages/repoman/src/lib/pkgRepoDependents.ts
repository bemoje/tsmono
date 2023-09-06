import { getPackages } from './getPackages'

export function pkgRepoDependents(pkg: Record<string, any>): Record<string, any>[] {
  const result: Record<string, any>[] = []
  const packs = getPackages()
  const _pkg = packs.find((o) => o.pkg.name === pkg.name)
  function recurse(pkg: Record<string, any>) {
    const dependents = packs.filter(({ owndeps }) => {
      return owndeps.includes(pkg.name)
    })
    if (!dependents.length) return
    dependents.forEach((o) => {
      if (result.includes(o)) return
      result.push(o)
      recurse(o)
    })
  }
  recurse(_pkg!)
  return result
}
