/**
 * Checks if the given number is a valid hour in the 24-hour format.
 * @remarks
 * This function checks if the given number is an integer and falls within the range of 0 to 23 (inclusive).
 * @param n - The number to be checked.
 * @returns A boolean indicating whether the number is a valid hour or not.
 * @example ```ts
 * isValidHours(12);  // returns true
 * isValidHours(24);  // returns false
 * isValidHours(15.5);  // returns false
 * ```
 */
export function isValidHours(n: number): boolean {
  return n >= 0 && n <= 23 && Number.isInteger(n)
}
