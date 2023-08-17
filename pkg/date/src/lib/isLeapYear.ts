import { assertValidDateYear } from './assertValidDateYear'

/**
 * Checks if a given year is a leap year.
 * A leap year is exactly divisible by 4 except for century years (years ending with 00).
 * The century year is a leap year only if it is perfectly divisible by 400.
 * @param year The year to check. Must be a valid year number.
 * @returns `true` if the year is a leap year, `false` otherwise.
 * @throws Will throw an error if the year is not a valid number.
 * @example ```ts
 * isLeapYear(2000); ;
 * //=> true
 * isLeapYear(2001); ;
 * //=> false
 * ```
 */
export function isLeapYear(year: number): boolean {
  assertValidDateYear(year)
  return (0 == year % 4 && 0 != year % 100) || 0 == year % 400
}
