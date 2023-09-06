/**
 * Checks if the provided year is a valid date year.
 * @remarks This function will return true if the year is a positive integer, false otherwise.
 * @param year The year to be checked.
 * @returns A boolean indicating whether the year is valid or not.
 * @example ```ts
 * isValidDateYear(2020); ;
 * //=> true
 * isValidDateYear(-2020);;
 * //=> false
 * isValidDateYear(2020.5);;
 * //=> false
 * ```
 */
export function isValidDateYear(year: number): boolean {
  return Number.isInteger(year) && year >= 0
}
