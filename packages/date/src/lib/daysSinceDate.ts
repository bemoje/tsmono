import { MS_IN_DAY } from './constants/MS_IN_DAY'
import { msSinceDate } from './msSinceDate'

/**
 * Calculates the number of days that have passed since the given date.
 * @param date The date from which to calculate the number of days passed.
 * @returns The number of days since the given date.
 * @example ```ts
 * new Date('2020-01-01');;
 * //=> <date object>
 * daysSinceDate(new Date('2020-01-01'));;
 * //=> <number of days since 2020-01-01>
 * ```
 */
export function daysSinceDate(date: Date | number): number {
  return msSinceDate(date) / MS_IN_DAY
}
