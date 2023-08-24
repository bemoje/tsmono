import { assertValidHours } from './assertValidHours'
import { assertValidMilliseconds } from './assertValidMilliseconds'
import { assertValidMinutes } from './assertValidMinutes'
import { assertValidSeconds } from './assertValidSeconds'

/**
 * Asserts that the provided hours, minutes, seconds, and milliseconds are valid.
 * Throws an error if any of the provided values are not valid.
 * @param hours - The hours to validate. Must be a number between 0 and 23.
 * @param minutes - The minutes to validate. Must be a number between 0 and 59.
 * @param seconds - The seconds to validate. Must be a number between 0 and 59.
 * @param milliseconds - The milliseconds to validate. Must be a number between 0 and 999.
 * @throws If any of the provided values are not valid.
 * @example ```ts
 * assertValidTime(12, 30, 45, 500); // No error thrown
 * assertValidTime(24, 60, 60, 1000); // Error thrown
 * ```
 */
export function assertValidTime(hours: number, minutes: number, seconds: number, milliseconds: number) {
  assertValidHours(hours)
  assertValidMinutes(minutes)
  assertValidSeconds(seconds)
  assertValidMilliseconds(milliseconds)
}
