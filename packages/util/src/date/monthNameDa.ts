import { assertThat } from '../validation/assertThat'
import { isValidDateMonth } from './isValidDateMonth'

/**
 * Returns the name, in Danish language, of the month corresponding to the provided month number.
 *
 * @param month - A month number between 1 and 12.
 * @param maxLength - The maximum length of the returned string. If not provided, the full name is returned.
 *
 * @throws if the provided month number is not a valid month.
 *
 * @example ```ts
 * monthNameDA(9) //=> 'September'
 * monthNameDA(9, 3) //=> 'Sep'
 * monthNameDA(9, 4) //=> 'Sept'
 * monthNameDA(5, 4) //=> 'Maj' // The full name is not long enough to be shortened.
 * ```
 */
export function monthNameDa(month: number, maxLength?: number): string {
  assertThat(month, isValidDateMonth)
  const fullName = MONTH_NAMES_DA[month]
  if (maxLength === undefined) return fullName
  return fullName.substring(0, maxLength)
}

const MONTH_NAMES_DA = [
  '',
  'Januar',
  'Februar',
  'Marts',
  'April',
  'Maj',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'December',
]
