/**
 * Checks if the provided month is a valid month number (1-12).
 * @param month The month number to validate.
 * @returns A boolean indicating whether the month is valid.
 * @example ```ts
 * isValidDateMonth(5);;
 * //=> true
 * isValidDateMonth(13);;
 * //=> false
 * ```
 */
export function isValidDateMonth(month: number): boolean {
  return Number.isInteger(month) && month >= 1 && month <= 12
}
