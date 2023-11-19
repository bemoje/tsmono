import { assertThat, isValidNumber } from '@bemoje/util'

export function parseNumber(string: string): number {
  return assertThat(Number(string.trim()), isValidNumber)
}
