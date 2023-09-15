import { getPackagesWithExternalDependencies } from './getPackagesWithExternalDependencies'
import { getPackagesWithNoExternalDependencies } from './getPackagesWithNoExternalDependencies'
import { implicitDependencies } from './implicitDependencies'
import { implicitDependenciesRecursive } from './implicitDependenciesRecursive'
import { implicitDependencyTree } from './implicitDependencyTree'
import { implicitDependents } from './implicitDependents'
import { implicitDependentsRecursive } from './implicitDependentsRecursive'
import { packageVersionsMap } from './util/packageVersionsMap'

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
