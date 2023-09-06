import { MS_IN_MINUTE } from './constants/MS_IN_MINUTE'
import { msSinceDate } from './msSinceDate'

/**
 * Calculates the number of minutes that have passed since the given date.
 * @param date The date from which to calculate the number of minutes that have passed.
 * @returns The number of minutes that have passed since the given date.
 * @example ```ts
 * new Date('2020-01-01T00:00:00Z');;
 * //=> {date}
 * minutesSinceDate(new Date('2020-01-01T00:00:00Z'));;
 * //=> {number of minutes since 2020-01-01T00:00:00Z}
 * ```
 */
export function minutesSinceDate(date: Date | number): number {
  return msSinceDate(date) / MS_IN_MINUTE
}
