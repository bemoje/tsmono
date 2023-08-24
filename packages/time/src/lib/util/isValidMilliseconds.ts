/**
 * Checks if the given number is a valid millisecond value.
 * A valid millisecond value is an integer between 0 and 999 inclusive.
 * @param n - The number to check.
 * @returns A boolean indicating whether the number is a valid millisecond value.
 * @example ```ts
 * isValidMilliseconds(500); // returns true
 * isValidMilliseconds(1000); // returns false
 * isValidMilliseconds(-1); // returns false
 * ```
 */
export function isValidMilliseconds(n: number): boolean {
  return n >= 0 && n <= 999 && Number.isInteger(n)
}
