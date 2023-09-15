import { execute } from '@bemoje/util'
import { getPackages } from './getPackages'
import { packageVersionsMap } from './util/packageVersionsMap'

export async function updateImplicitDependencies(names?: string[]) {
  const versions = packageVersionsMap()
  getPackages(names).map((o) => {
    const { rootdir } = o
    const deps = o.implicitDependencies(true).filter((dep) => {
      const latestVersion = versions.get(dep)
      const installedVersion = o.installedVersionOf(dep)
      return latestVersion !== installedVersion
    })
    if (!deps.length) return
    execute(`npm update ${deps.join(' ')}`, { silent: true, fadedOutput: true, cwd: rootdir })
  })
}
