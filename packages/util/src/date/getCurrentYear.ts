/**
 * Returns the current year as a number.
 * @remarks This function uses the `getUTCFullYear` method of the `Date` object to get the current year.
 * @returns The current year as a number.
 * @example ```ts
 * getCurrentYear();;
 * //=> 2022
 * ```
 */
export function getCurrentYear(): number {
  return new Date().getUTCFullYear()
}

/**
 * Returns the year as a number between 0 and 9999.
 *
 * @remarks to use UTC time, use @see getYear.UTC()
 *
 * @param date If not the current year is wanted, pass a date object to get the year from.
 */
export function getYear(date = new Date()): number {
  return date.getFullYear()
}

getYear.UTC = function getYearUTC(date = new Date()): number {
  return date.getUTCFullYear()
}

/**
 * Returns the month as a number between 1 and 12.
 *
 * @remarks to use UTC time, use @see getMonth.UTC()
 *
 * @param date If not the current year is wanted, pass a date object to get the year from.
 */
export function getMonth(date = new Date()): number {
  return date.getMonth() + 1
}

getMonth.UTC = function getMonthUTC(date = new Date()): number {
  return date.getUTCMonth() + 1
}

console.log({ year: getYear(), month: getMonth() })
console.log({ yearUTC: getYear.UTC(), monthUTC: getMonth.UTC() })
