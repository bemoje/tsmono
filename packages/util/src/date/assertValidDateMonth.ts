import { isValidDateMonth } from './isValidDateMonth'

/**
 * Asserts if the provided month is a valid date month.
 * @param month The month to be validated. Should be a number between 1 and 12.
 * @throws Will throw an error if the month is not a valid date month.
 * @example ```ts
 * assertValidDateMonth(13);;
 * //=> Error: Invalid month: 13.
 * assertValidDateMonth(1);;
 * //=> undefined
 * ```
 */
export function assertValidDateMonth(month: number): void {
  if (!isValidDateMonth(month)) throw new Error(`Invalid month: ${month}.`)
}
