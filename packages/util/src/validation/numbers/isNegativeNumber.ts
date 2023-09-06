import { isValidNumber } from './isValidNumber'

/**
 * Checks if a given number is negative or not.
 * @param n - The number to be checked.
 * @returns A boolean value indicating whether the input number is negative or not.
 * @example
 * isNegativeNumber(-5) //=> true
 * isNegativeNumber(0) //=> true
 * isNegativeNumber(5) //=> false
 */
export function isNegativeNumber(n: number): boolean {
  return isValidNumber(n) && n <= 0
}
