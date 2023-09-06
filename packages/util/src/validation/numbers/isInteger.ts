/**
 * Checks if the provided number is an integer.
 * @remarks This function uses the built-in `Number.isInteger` method.
 * @param int The number to check.
 * @returns A boolean indicating whether the provided number is an integer.
 * @example ```ts
 * isInteger(5);
 * //=> true
 * isInteger(5.5);
 * //=> false
 * ```
 */
export const isInteger = Number.isInteger
