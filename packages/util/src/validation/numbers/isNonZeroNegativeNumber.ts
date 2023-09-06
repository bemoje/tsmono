import { isValidNumber } from './isValidNumber'

export function isNonZeroNegativeNumber(n: number): boolean {
  return isValidNumber(n) && n < 0
}
