import { isValidSeconds } from './isValidSeconds'

/**
 * Asserts whether the provided number is a valid second value.
 * @remarks
 * This function throws an error if the provided number is not a valid second value (i.e., between 0 and 59).
 * @param n - The number to be validated.
 * @throws Will throw an error if the provided number is not a valid second value.
 * @example ```ts
 * assertValidSeconds(30); // No error
 * assertValidSeconds(60); // Throws error
 * ```
 */
export function assertValidSeconds(n: number): void {
  if (!isValidSeconds(n)) throw new Error('Expected seconds to be between 0 and 59. Got: ' + n)
}
