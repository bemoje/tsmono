import { getPackagesWithExternalDependencies } from '../util/getPackagesWithExternalDependencies'
import { getPackagesWithNoExternalDependencies } from '../util/getPackagesWithNoExternalDependencies'
import { implicitDependencies } from '../util/implicitDependencies'
import { implicitDependenciesRecursive } from '../util/implicitDependenciesRecursive'
import { implicitDependencyTree } from '../util/implicitDependencyTree'
import { implicitDependents } from '../util/implicitDependents'
import { implicitDependentsRecursive } from '../util/implicitDependentsRecursive'
import { packageVersionsMap } from '../util/packageVersionsMap'

export function packageDependencies(name?: string) {
  console.log('\n\npackage versions:')
  console.log('----------------------------------')
  console.log(packageVersionsMap())

  console.log('\n\npackages with no external dependencies:')
  console.log('----------------------------------')
  console.log(getPackagesWithNoExternalDependencies())

  console.log('\n\npackages with external dependencies:')
  console.log('----------------------------------')
  console.log(getPackagesWithExternalDependencies())

  if (name) {
    console.log('\n\n' + name + ': implicit dependencies:')
    console.log('----------------------------------')
    console.log(new Set(implicitDependencies(name)))

    console.log('\n\n' + name + ': implicit dependencies recursively:')
    console.log('----------------------------------')
    console.log(new Set(implicitDependenciesRecursive(name)))

    console.log('\n\n' + name + ': implicit dependendts:')
    console.log('----------------------------------')
    console.log(new Set(implicitDependents(name)))

    console.log('\n\n' + name + ': implicit dependendts recursively:')
    console.log('----------------------------------')
    console.log(new Set(implicitDependentsRecursive(name)))

    console.log('\n\n' + name + ': implicit dependency tree:')
    console.log('----------------------------------')
    console.log(implicitDependencyTree(name))
  }
}
