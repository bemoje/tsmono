import { assertValidTimeInt } from './assertValidTimeInt'
import { timeIntToArrayUnsafe } from './timeIntToArrayUnsafe'

/**
 * Converts a time integer into an array of hours, minutes, and seconds.
 * @remarks
 * This function will throw an error if the provided time integer is not valid.
 * @param ms - The time integer to convert, represented in milliseconds.
 * @returns An array of three numbers representing hours, minutes, and seconds respectively.
 * @throws Will throw an error if the provided time integer is not valid.
 * @example ```ts
 * const timeArray = timeIntToArray(3600000); // returns [1, 0, 0]
 * ```
 */
export function timeIntToArray(ms: number): number[] {
  assertValidTimeInt(ms)
  return timeIntToArrayUnsafe(ms)
}
