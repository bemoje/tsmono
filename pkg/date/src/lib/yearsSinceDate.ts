import { MS_IN_YEAR } from './constants/MS_IN_YEAR'
import { msSinceDate } from './msSinceDate'

/**
 * Calculates the number of years that have passed since the provided date.
 * @param date The date from which to calculate the number of years passed.
 * @returns The number of years that have passed since the provided date.
 * @example ```ts
 * yearsSinceDate(new Date('2000-01-01'));;
 * //=> {number of years since '2000-01-01'}
 * ```
 */
export function yearsSinceDate(date: Date | number): number {
  return msSinceDate(date) / MS_IN_YEAR
}
