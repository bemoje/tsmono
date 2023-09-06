import { isValidMinutes } from './isValidMinutes'

/**
 * Asserts that the provided number is a valid minute value (between 0 and 59).
 * If the number is not valid, it throws an error.
 * @param n - The number to be validated.
 * @throws Will throw an error if the number is not a valid minute value.
 * @example ```ts
 * assertValidMinutes(30); // No error
 * assertValidMinutes(60); // Throws Error: 'Expected minutes to be between 0 and 59. Got: 60'
 * ```
 */
export function assertValidMinutes(n: number): void {
  if (!isValidMinutes(n)) throw new Error('Expected minutes to be between 0 and 59. Got: ' + n)
}
