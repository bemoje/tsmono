/**
 * Checks if a given number is a valid time integer.
 * A valid time integer is between 0 and 86399999 (inclusive) and is an integer.
 * @param n - The number to be checked.
 * @returns A boolean indicating whether the number is a valid time integer.
 * @example ```ts
 * isValidTimeInt(50000); // returns true
 * isValidTimeInt(90000000); // returns false
 * ```
 */
export function isValidTimeInt(n: number): boolean {
  return n >= 0 && n < 86400000 && Number.isInteger(n)
}
