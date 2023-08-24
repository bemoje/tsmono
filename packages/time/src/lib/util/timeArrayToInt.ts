import { assertValidTimeArray } from './assertValidTimeArray'
import { timeArrayToIntUnsafe } from './timeArrayToIntUnsafe'

/**
 * Converts an array of time values into an integer.
 * @remarks
 * This function asserts that the provided array is a valid time array before performing the conversion.
 * @param array - The array of time values to convert.
 * @returns The converted integer value.
 * @throws Will throw an error if the provided array is not a valid time array.
 * @example ```ts
 * const timeArray = [12, 30, 15];
 * const result = timeArrayToInt(timeArray);
 * console.log(result); // Expected output: 123015
 * ```
 */
export function timeArrayToInt(array: number[]): number {
  assertValidTimeArray(array)
  return timeArrayToIntUnsafe(array)
}
