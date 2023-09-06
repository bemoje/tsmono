import { isValidDateYear } from './isValidDateYear'

/**
 * Asserts that the provided year is a valid date year.
 * @param year The year to be validated
 * @throws Will throw an error if the year is not valid.
 * @example ```ts
 * assertValidDateYear(2020);;
 * //=> undefined
 * assertValidDateYear(10000);;
 * //=> Error: Invalid year: 10000.
 * ```
 * @returns void
 */
export function assertValidDateYear(year: number): void {
  if (!isValidDateYear(year)) throw new Error(`Invalid year: ${year}.`)
}
