import { allPackageNames } from './allPackageNames'
import { PackageDataView } from './PackageDataView'

export function getPackages(names?: string[]): PackageDataView[] {
  return allPackageNames()
    .filter((n) => !names || names.includes(n))
    .map((name) => {
      return new PackageDataView(name)
    })
}
