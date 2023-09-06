import { MS_IN_MONTH } from './constants/MS_IN_MONTH'
import { msSinceDate } from './msSinceDate'

/**
 * Calculates the number of months that have passed since the provided date.
 * @param date The date from which to calculate the number of passed months.
 * @returns The number of months that have passed since the provided date.
 * @example ```ts
 * new Date(2020, 0, 1);;
 * //=> {date}
 * monthsSinceDate(new Date(2020, 0, 1));;
 * //=> {number of months since January 1, 2020}
 * ```
 */
export function monthsSinceDate(date: Date | number): number {
  return msSinceDate(date) / MS_IN_MONTH
}
