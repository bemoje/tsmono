import { assertThat } from '@bemoje/util'
import { isString } from '../validators/isString'

export function parseString(string: string): string {
  return assertThat(string.trim(), isString)
}
