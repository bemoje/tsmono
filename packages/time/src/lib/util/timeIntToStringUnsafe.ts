import { timeArrayToStringUnsafe } from './timeArrayToStringUnsafe'
import { timeIntToArrayUnsafe } from './timeIntToArrayUnsafe'

/**
 * Converts a time integer to a string in an unsafe manner.
 * @remarks
 * This function does not perform any safety checks and may throw an error if the input is not as expected.
 * @param ms - The time in milliseconds to be converted to a string.
 * @param msDelimiter - The delimiter to be used in the resulting string. Defaults to '.'.
 * @returns The time as a string.
 * @example ```ts
 * const timeString = timeIntToStringUnsafe(1500, ':');
 * console.log(timeString); // Outputs "1:500"
 * ```
 */
export function timeIntToStringUnsafe(ms: number, msDelimiter = '.'): string {
  return timeArrayToStringUnsafe(timeIntToArrayUnsafe(ms), msDelimiter)
}
