import { getImportedExternal } from './getImportedExternal'
import { getPackages } from './getPackages'

export function getPackagesWithExternalDependencies() {
  const extDeps: Map<string, string> = new Map()
  const noExtDeps: Set<string> = new Set()
  getPackages().forEach(({ name, rootdir }) => {
    const { imports } = getImportedExternal(rootdir)
    if (imports.length) extDeps.set(name, imports.join(', '))
    if (!imports.length) noExtDeps.add(name)
  })
  return extDeps
}
