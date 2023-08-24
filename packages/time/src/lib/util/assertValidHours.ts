import { isValidHours } from './isValidHours'

/**
 * Asserts that the given number is a valid hour (between 0 and 23).
 * If the number is not a valid hour, it throws an error.
 * @param n - The number to be validated.
 * @throws Will throw an error if the number is not a valid hour.
 * @example ```ts
 * assertValidHours(12); // No error
 * assertValidHours(24); // Throws Error: 'Expected hours to be between 0 and 23. Got: 24'
 * ```
 */
export function assertValidHours(n: number): void {
  if (!isValidHours(n)) throw new Error('Expected hours to be between 0 and 23. Got: ' + n)
}
