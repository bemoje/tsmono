import { assertValidTimeInt } from './assertValidTimeInt'
import { timeIntToStringUnsafe } from './timeIntToStringUnsafe'

/**
 * Converts a time integer to a string.
 * @param ms - The time in milliseconds to be converted.
 * @param msDelimiter - The delimiter to be used in the resulting string. Defaults to '.'.
 * @returns The time as a string, formatted with the specified delimiter.
 * @throws Will throw an error if the provided time integer is not valid.
 * @example ```ts
 * timeIntToString(1500, ':'); // Returns '1:500'
 * ```
 */
export function timeIntToString(ms: number, msDelimiter = '.'): string {
  assertValidTimeInt(ms)
  return timeIntToStringUnsafe(ms, msDelimiter)
}
