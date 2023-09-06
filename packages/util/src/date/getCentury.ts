import { assertValidDateYear } from './assertValidDateYear'

/**
 * This function takes a year as a parameter and returns the century it belongs to.
 * @param year The year to determine the century for. Must be a valid year number.
 * @returns The century the year belongs to.
 * @throws Will throw an error if the year is not a valid number.
 * @example ```ts
 * getCentury(2000);;
 * //=> 20
 * getCentury(1899);;
 * //=> 19
 * ```
 */
export function getCentury(year: number): number {
  assertValidDateYear(year)
  return Math.floor(year / 100) + 1
}
