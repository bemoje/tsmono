/**
 * Checks if a given number is a positive integer.
 * @remarks This function uses the `Number.isInteger` method and a simple greater than zero.
 * @param int The number to check.
 * @returns A boolean indicating whether the input is a positive integer.
 * @example ```ts
 * isNonZeroPositiveInteger(5); ;
 * //=> true
 * isNonZeroPositiveInteger(-5);;
 * //=> false
 * isNonZeroPositiveInteger(0); ;
 * //=> false
 * isNonZeroPositiveInteger(5.5);;
 * //=> false
 * ```
 */
export function isNonZeroPositiveInteger(int: number): boolean {
  return Number.isInteger(int) && int > 0
}
