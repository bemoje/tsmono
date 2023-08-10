import { isValidTimeInt } from './isValidTimeInt'

/**
 * Asserts that the provided number is a valid time integer.
 * A valid time integer is between 0 and 86399999, inclusive.
 * If the number is not valid, an error is thrown.
 * @param n - The number to be validated.
 * @throws Will throw an error if the number is not a valid time integer.
 * @example ```ts
 * assertValidTimeInt(50000); // No error
 * assertValidTimeInt(90000000); // Throws Error: 'Expected time int to be between 0 and 86399999. Got: 90000000'
 * ```
 */
export function assertValidTimeInt(n: number): void {
  if (!isValidTimeInt(n)) throw new Error('Expected time int to be between 0 and 86399999. Got: ' + n)
}
