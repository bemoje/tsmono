import { MS_IN_SECOND } from './constants/MS_IN_SECOND'
import { msSinceDate } from './msSinceDate'

/**
 * Returns the number of seconds that have passed since the given date.
 * @param date The date from which to calculate the number of seconds.
 * @returns The number of seconds since the given date.
 * @example ```ts
 * secondsSinceDate(new Date('2020-01-01'));;
 * //=> {number of seconds since 2020-01-01}
 * ```
 */
export function secondsSinceDate(date: Date | number): number {
  return msSinceDate(date) / MS_IN_SECOND
}
