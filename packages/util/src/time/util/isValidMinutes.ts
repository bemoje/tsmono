/**
 * Checks if the given number is a valid minute value.
 * @remarks
 * This function checks if the given number is an integer between 0 and 59, inclusive.
 * @param n - The number to check.
 * @returns A boolean indicating whether the number is a valid minute value.
 * @example ```ts
 * isValidMinutes(30); // returns true
 * isValidMinutes(60); // returns false
 * ```
 */
export function isValidMinutes(n: number): boolean {
  return n >= 0 && n <= 59 && Number.isInteger(n)
}
