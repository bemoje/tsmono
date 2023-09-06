/**
 * Returns the current year as a number.
 * @remarks This function uses the `getUTCFullYear` method of the `Date` object to get the current year.
 * @returns The current year as a number.
 * @example ```ts
 * getCurrentYear();;
 * //=> 2022
 * ```
 */
export function getCurrentYear(): number {
  return new Date().getUTCFullYear()
}
