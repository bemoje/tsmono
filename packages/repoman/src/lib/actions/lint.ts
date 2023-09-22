import { execute } from '@bemoje/util'

/**
 * Lint all or some packages
 * @param names - The names of the packages to lint. If empty, all packages will be linted.
 */
export function lint(names?: string[]) {
  execute('nx run-many -t lint' + (names ? ' -p ' + names.join(',') : ''))
}
