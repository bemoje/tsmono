import { isValidNumber } from './isValidNumber'

export function isNegativeNumber(n: number): boolean {
  return isValidNumber(n) && n <= 0
}
