/**
 * Checks if a given number is a negative non-zero integer.
 * @remarks This function uses the `Number.isInteger` method to check if the input is an integer, and then checks if it is less than 0.
 * @param int The number to check.
 * @returns A boolean indicating whether the input is a negative integer.
 * @example ```ts
 * isNonZeroNegativeInteger(-5); ;
 * //=> true
 * isNonZeroNegativeInteger(0);  ;
 * //=> false
 * isNonZeroNegativeInteger(5);  ;
 * //=> false
 * ```
 */
export function isNonZeroNegativeInteger(int: number): boolean {
  return Number.isInteger(int) && int < 0
}
