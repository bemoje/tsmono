/**
 * Calculates the number of milliseconds that have passed since the provided date.
 * @param date The date from which to calculate the elapsed time.
 * @throws If the provided date is not a Date object or an integer.
 * @returns The number of milliseconds that have passed since the provided date.
 * @example ```ts
 * msSinceDate(new Date('2020-01-01'));;
 * //=> {number of milliseconds since 2020-01-01}
 * ```
 */
export function msSinceDate(date: Date | number): number {
  if (typeof date === 'number') {
    if (!Number.isInteger(date)) {
      throw new Error('Expected date to be a Date or an integer. Got: ' + date)
    }
    date = new Date(date)
  }
  return Date.now() - date.getTime()
}
