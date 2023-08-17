import { MS_IN_HOUR } from './constants/MS_IN_HOUR'
import { msSinceDate } from './msSinceDate'

/**
 * Calculates the number of hours that have passed since the given date.
 * @param date The date from which to calculate the number of hours passed.
 * @returns The number of hours that have passed since the given date.
 * @example ```ts
 * new Date('2020-01-01T00:00:00Z');;
 * //=> {date object}
 * hoursSinceDate(new Date('2020-01-01T00:00:00Z'));;
 * //=> {number of hours since January 1, 2020}
 * ```
 */
export function hoursSinceDate(date: Date | number): number {
  return msSinceDate(date) / MS_IN_HOUR
}
