import { isValidNumber } from './isValidNumber'

export function isPositiveNumber(n: number): boolean {
  return isValidNumber(n) && n >= 0
}
