import { execute } from '@bemoje/util'
import { getPackages } from './getPackages'
import { packageVersionsMap } from './packageVersionsMap'

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
    const pkgdeps = o.pkg.dependencies
    if (!pkgdeps) throw new Error('no dependencies defined in package.json')
    const filtDeps = deps.filter((dep) => pkgdeps[dep] === 'latest')
    execute(`npm update ${filtDeps.join(' ')}`, { silent: true, fadedOutput: true, cwd: rootdir })
  })
}
