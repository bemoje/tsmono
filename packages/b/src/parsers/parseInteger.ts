import { assertThat } from '@bemoje/util'

export function parseInteger(string: string): number {
  return assertThat(Number(string.trim()), Number.isInteger)
}
