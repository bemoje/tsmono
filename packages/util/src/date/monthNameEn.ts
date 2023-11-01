import { assertThat } from '../validation/assertThat'
import { isValidDateMonth } from './isValidDateMonth'

/**
 * Returns the name, in English language, of the month corresponding to the provided month number.
 *
 * @param month - A month number between 1 and 12.
 * @param maxLength - The maximum length of the returned string. If not provided, the full name is returned.
 *
 * @throws if the provided month number is not a valid month.
 *
 * @example ```ts
 * monthNameEN(9) //=> 'September'
 * monthNameEN(9, 3) //=> 'Sep'
 * monthNameEN(9, 4) //=> 'Sept'
 * monthNameDA(5, 4) //=> 'May' // The full name is not long enough to be shortened.
 * ```
 */
export function monthNameEn(month: number, maxLength?: number): string {
  assertThat(month, isValidDateMonth)
  const fullName = MONTH_NAMES_EN[month]
  if (maxLength === undefined) return fullName
  return fullName.substring(0, maxLength)
}

const MONTH_NAMES_EN = [
  '',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
