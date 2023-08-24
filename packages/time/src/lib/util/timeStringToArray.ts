import { assertValidTimeArray } from './assertValidTimeArray'
import { assertValidTimeStringFormatting } from './assertValidTimeStringFormatting'
import { timeStringToArrayUnsafe } from './timeStringToArrayUnsafe'

/**
 * Converts a time string into an array of numbers.
 * @remarks
 * This function is part of the Time Utilities library.
 * @param string - The time string to be converted. The string should be in the format "HH:MM:SS".
 * @returns An array of numbers representing the hours, minutes, and seconds.
 * @throws Will throw an error if the input string is not in the correct format.
 * @example ```ts
 * const timeArray = timeStringToArray("12:34:56");
 * console.log(timeArray); // Output: [12, 34, 56]
 * ```
 */
export function timeStringToArray(string: string): number[] {
  assertValidTimeStringFormatting(string)
  const array = timeStringToArrayUnsafe(string)
  assertValidTimeArray(array)
  return array
}
