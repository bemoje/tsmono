import { build } from './build'
import { fixAll } from './fixAll'
import { lint } from './lint'
import { test } from './tests'

export function prepub(names?: string[]) {
  fixAll()
  lint(names)
  test(names)
  build(names)
}
