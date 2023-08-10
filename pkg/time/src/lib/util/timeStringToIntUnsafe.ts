import { timeArrayToIntUnsafe } from './timeArrayToIntUnsafe'
import { timeStringToArrayUnsafe } from './timeStringToArrayUnsafe'

/**
 * Converts a time string to an integer representation.
 * This function is unsafe because it does not perform any validation on the input string.
 * It assumes that the input string is a valid time string.
 * @remarks
 * This function is part of the Time Utilities library.
 * @param string - The time string to convert. The string should be in the format "HH:MM:SS".
 * @returns The integer representation of the time string.
 * @throws Will throw an error if the input string is not a valid time string.
 * @example ```ts
 * const timeString = "12:34:56";
 * const timeInt = timeStringToIntUnsafe(timeString);
 * console.log(timeInt); // Expected output: 45296
 * ```
 */
export function timeStringToIntUnsafe(string: string): number {
  return timeArrayToIntUnsafe(timeStringToArrayUnsafe(string))
}
