import { assertValidDateMonth } from './assertValidDateMonth'
import { isLeapYear } from './isLeapYear'

/**
 * Get number of days that there are in a given month of a given year.
 * Note: The number of days in february depends on whether it is leap year. If no year is given, it is assumed that it is not leap year.
 * @param month The month for which the number of days is to be calculated. Should be a number between 1 and 12.
 * @param year The year for which the number of days in the month is to be calculated. Optional.
 * @returns The number of days in the given month for the specified year.
 * @throws Will throw an error if the month is not a valid number between 1 and 12.
 * @example ```ts
 * numDaysInMonth(2, 2020);;
 * //=> 29
 * numDaysInMonth(2);;
 * //=> 28
 * numDaysInMonth(1);;
 * //=> 31
 * ```
 */
export function numDaysInMonth(month: number, year?: number): number {
  assertValidDateMonth(month)
  const DAYS_IN_MONTH = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  return month === 2 && year !== undefined && isLeapYear(year) ? 29 : DAYS_IN_MONTH[month]
}
