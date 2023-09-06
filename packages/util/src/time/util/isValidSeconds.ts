/**
 * Checks if the given number is a valid second value.
 * @remarks
 * This function checks if the given number is an integer between 0 and 59 (inclusive).
 * @param n - The number to check.
 * @returns A boolean indicating whether the number is a valid second value.
 * @example ```ts
 * isValidSeconds(30);  // returns true
 * isValidSeconds(60);  // returns false
 * isValidSeconds(30.5);  // returns false
 * ```
 */
export function isValidSeconds(n: number): boolean {
  return n >= 0 && n <= 59 && Number.isInteger(n)
}
