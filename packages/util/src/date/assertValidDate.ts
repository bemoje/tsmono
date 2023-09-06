import { isValidDate } from './isValidDate'

/**
 * Asserts that the provided date parameters form a valid date.
 * @param year The year of the date.
 * @param month The month of the date.
 * @param day The day of the date.
 * @param hour The hour of the date.
 * @param minute The minute of the date.
 * @param second The second of the date.
 * @param millisecond The millisecond of the date.
 * @throws Will throw an error if the date is not valid.
 * @example ```ts
 * assertValidDate(2021, 12, 31, 23, 59, 59, 999);;
 * //=> true
 * assertValidDate(2021, 13, 31, 23, 59, 59, 999);;
 * //=> throws an error
 * ```
 */
export function assertValidDate(
  year?: number | string,
  month?: number | string,
  day?: number | string,
  hour?: number | string,
  minute?: number | string,
  second?: number | string,
  millisecond?: number | string,
): void {
  if (!isValidDate(year, month, day, hour, minute, second, millisecond)) {
    throw new Error(
      `Expected valid date. Got: ${JSON.stringify({
        year,
        month,
        day,
        hour,
        minute,
        second,
        millisecond,
      })}.`,
    )
  }
}
