import { assertValidTimeStringFormatting } from './assertValidTimeStringFormatting'
import { timeArrayToIntUnsafe } from './timeArrayToIntUnsafe'
import { timeStringToArray } from './timeStringToArray'

/**
 * Converts a time string to an integer.
 * @remarks
 * This function takes a string representation of time and converts it into an integer.
 * The string should be in the format "HH:MM:SS".
 * @param string - The time string to be converted.
 * @returns The integer representation of the provided time string.
 * @throws Will throw an error if the input string is not in the correct format.
 * @example ```ts
 * timeStringToInt("12:34:56"); // returns 45296
 * ```
 */
export function timeStringToInt(string: string): number {
  assertValidTimeStringFormatting(string)
  return timeArrayToIntUnsafe(timeStringToArray(string))
}
