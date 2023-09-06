import { isValidNumber } from './isValidNumber'

export function isNonZeroPositiveNumber(n: number): boolean {
  return isValidNumber(n) && n > 0
}
