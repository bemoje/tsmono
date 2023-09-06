import { MS_IN_WEEK } from './constants/MS_IN_WEEK'
import { msSinceDate } from './msSinceDate'

/**
 * Calculates the number of weeks that have passed since the provided date.
 * @param date The date from which to calculate the number of weeks passed.
 * @returns The number of weeks since the provided date.
 * @example ```ts
 * weeksSinceDate(new Date('2020-01-01'));;
 * //=> {number of weeks since '2020-01-01'}
 * ```
 */
export function weeksSinceDate(date: Date | number): number {
  return msSinceDate(date) / MS_IN_WEEK
}
