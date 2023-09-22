import { execute } from '@bemoje/util'
import { build } from './build'
import { fixAll } from './fixAll'
import { lint } from './lint'
import { test } from './tests'

export function prepub(names?: string[]) {
  fixAll()
  if (names && names.length === 1) {
    execute('nx run-many -t lint,test' + (names ? ' -p ' + names.join(',') : ''))
  } else {
    lint(names)
    test(names)
  }
  build(names)
}
