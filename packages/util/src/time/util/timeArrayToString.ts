import { assertValidTimeArray } from './assertValidTimeArray'
import { timeArrayToStringUnsafe } from './timeArrayToStringUnsafe'

/**
 * Converts an array of time values into a string representation.
 * @param array - The array of time values to convert. Each value should represent a unit of time in the order of hours, minutes, seconds, and milliseconds.
 * @param msDelimiter - The delimiter to use between the seconds and milliseconds. Defaults to '.'.
 * @returns A string representation of the time values in the format 'HH:MM:SS.MS'.
 * @throws Will throw an error if the array is not a valid time array.
 * @example ```ts
 * const timeArray = [12, 30, 15, 500];
 * const result = timeArrayToString(timeArray);
 * console.log(result); // Outputs: '12:30:15.500'
 * ```
 */
export function timeArrayToString(array: number[], msDelimiter = '.'): string {
  assertValidTimeArray(array)
  return timeArrayToStringUnsafe(array, msDelimiter)
}
