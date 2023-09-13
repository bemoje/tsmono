import { readJsonFileSync } from '@bemoje/util'
import path from 'path'
import { getPackages } from './getPackages'

export function pkgRepoDependents(pkg: string | Record<string, any>): Record<string, any>[] {
  let __pkg: Record<string, unknown>
  if (typeof pkg === 'string') {
    __pkg = readJsonFileSync(path.join(process.cwd(), 'packages', pkg, 'package.json')) as Record<string, unknown>
  } else {
    __pkg = pkg
  }
  const result: Record<string, any>[] = []
  const packs = getPackages()
  const _pkg = packs.find((o) => o.pkg.name === __pkg.name)
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
