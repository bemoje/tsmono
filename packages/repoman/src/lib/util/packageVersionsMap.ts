import { getPackages } from './getPackages'

export function packageVersionsMap(): Map<string, string> {
  const versions = new Map<string, string>()
  getPackages().forEach(({ packageJson }) => {
    versions.set(packageJson.name as string, packageJson.version as string)
  })
  return versions
}
