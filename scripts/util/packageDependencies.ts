import { getPackagesWithExternalDependencies } from './getPackagesWithExternalDependencies'
import { getPackagesWithNoExternalDependencies } from './getPackagesWithNoExternalDependencies'

export function packageDependencies() {
  console.log('\n\npackages with no external dependencies:')
  console.log('----------------------------------')
  console.log(Array.from(getPackagesWithNoExternalDependencies()))

  console.log('\n\npackages with external dependencies:')
  console.log('----------------------------------')
  console.log(Array.from(getPackagesWithExternalDependencies()))
}
