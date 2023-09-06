import { getImportedBemoje } from './getImportedBemoje'
import { getImportedExternal } from './getImportedExternal'
import { getPackages } from './getPackages'

/**
 * No external and also no dependencies to other local packages that have.
 */

export function getPackagesWithNoExternalDependencies() {
  const extDeps: Map<string, string> = new Map()
  const noExtDeps: Set<string> = new Set()
  getPackages().forEach(({ name, rootdir }) => {
    const { imports } = getImportedExternal(rootdir)
    if (imports.length) extDeps.set(name, imports.join(', '))
    if (!imports.length) noExtDeps.add(name)
  })
  getPackages().forEach(({ name, rootdir }) => {
    const { imports } = getImportedBemoje(rootdir)
    if (imports.filter((imp) => extDeps.has(imp)).length) {
      noExtDeps.delete(name)
    }
  })
  return noExtDeps
}
