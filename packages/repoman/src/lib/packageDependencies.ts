import { getPackagesWithExternalDependencies } from './getPackagesWithExternalDependencies'
import { getPackagesWithNoExternalDependencies } from './getPackagesWithNoExternalDependencies'
import { packageVersionsMap } from './util/packageVersionsMap'

export function packageDependencies() {
  console.log('\n\npackage versions:')
  console.log('----------------------------------')
  console.log(packageVersionsMap())

  console.log('\n\npackages with no external dependencies:')
  console.log('----------------------------------')
  console.log(getPackagesWithNoExternalDependencies())

  console.log('\n\npackages with external dependencies:')
  console.log('----------------------------------')
  console.log(getPackagesWithExternalDependencies())
}
