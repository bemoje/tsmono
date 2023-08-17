import { isValidDateDay } from './isValidDateDay'

/**
 * Asserts that the provided day, month, and optional year form a valid date.
 * If the date is not valid, it throws an error.
 * @param day The day of the month. Should be an integer between 1 and 31.
 * @param month The month of the year. Should be an integer between 1 and 12.
 * @param year The year of the date. Optional parameter. If provided, should be a positive integer.
 * @throws Will throw an error if the provided day, month, and optional year do not form a valid date.
 * @example ```ts
 * assertValidDateDay(31, 2, 2020);;
 * //=> Error: Invalid day of the month: 31.
 * assertValidDateDay(29, 2, 2020);;
 * //=> no error
 * ```
 */
export function assertValidDateDay(day: number, month: number, year?: number): void {
  if (!isValidDateDay(day, month, year)) throw new Error(`Invalid day of the month: ${day}.`)
}
