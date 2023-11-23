import { isValidNumber } from '@bemoje/util'

export function isNumber(value: unknown): value is number {
  return isValidNumber(value as number)
}
