import { isValidHours } from './isValidHours'
import { isValidMilliseconds } from './isValidMilliseconds'
import { isValidMinutes } from './isValidMinutes'
import { isValidSeconds } from './isValidSeconds'

/**
 * Checks if the provided hours, minutes, seconds, and milliseconds represent a valid time.
 * @remarks
 * This function will return false if any of the provided values are out of range for their respective units of time.
 * @param hours - The hours component of the time. Must be an integer between 0 and 23.
 * @param minutes - The minutes component of the time. Must be an integer between 0 and 59.
 * @param seconds - The seconds component of the time. Must be an integer between 0 and 59.
 * @param milliseconds - The milliseconds component of the time. Must be an integer between 0 and 999.
 * @returns A boolean indicating whether the provided values represent a valid time.
 * @example ```ts
 * isValidTime(12, 30, 15, 500);  // returns true
 * isValidTime(24, 0, 0, 0);  // returns false
 * ```
 */
export function isValidTime(hours: number, minutes: number, seconds: number, milliseconds: number) {
  return isValidHours(hours) && isValidMinutes(minutes) && isValidSeconds(seconds) && isValidMilliseconds(milliseconds)
}
