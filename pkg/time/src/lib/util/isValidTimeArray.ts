import { isValidTime } from './isValidTime'

/**
 * Checks if the given array is a valid time array.
 * A valid time array should have exactly 4 elements, each representing hours, minutes, seconds, and milliseconds respectively.
 * @param array - The array to be checked.
 * @returns A boolean indicating whether the array is a valid time array.
 * @example ```ts
 * isValidTimeArray([12, 30, 45, 500]); // returns true
 * isValidTimeArray([12, 60, 45, 500]); // returns false
 * ```
 */
export function isValidTimeArray(array: number[]): boolean {
  return array.length === 4 && isValidTime(array[0], array[1], array[2], array[3])
}
