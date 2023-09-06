/**
 * Checks if the provided value is a valid number.
 * @remarks This function checks if the provided value is a finite number and not NaN.
 * @param number The value to check.
 * @returns A boolean indicating whether the provided value is a valid number.
 * @example ```ts
 * isValidNumber(123);
 * //=> true
 * isValidNumber(NaN);
 * //=> false
 * isValidNumber(Infinity);
 * //=> false
 * ```
 */
export function isValidNumber(number: number): boolean {
  return isFinite(number) && !isNaN(number)
}
