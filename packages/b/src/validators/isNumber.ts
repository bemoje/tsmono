import { isValidNumber } from '@bemoje/util'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumber(value: any): value is number {
  return isValidNumber(value)
}
