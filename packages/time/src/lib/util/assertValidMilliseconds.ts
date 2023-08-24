import { isValidMilliseconds } from './isValidMilliseconds'

/**
 * Asserts that the provided number is a valid millisecond value.
 * @remarks
 * This function throws an error if the provided number is not a valid millisecond value (i.e., between 0 and 999).
 * @param n - The number to be validated.
 * @throws Will throw an error if the provided number is not a valid millisecond value.
 * @example ```ts
 * assertValidMilliseconds(500); // No error
 * assertValidMilliseconds(1000); // Throws error
 * ```
 */
export function assertValidMilliseconds(n: number): void {
  if (!isValidMilliseconds(n)) throw new Error('Expected milliseconds to be between 0 and 999. Got: ' + n)
}
