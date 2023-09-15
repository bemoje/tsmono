import { execute } from '@bemoje/util'

export function test(names?: string[]) {
  execute('nx run-many -t test' + (names ? ' -p ' + names.join(',') : ''))
}
