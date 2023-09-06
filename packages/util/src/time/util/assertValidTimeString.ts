import { assertValidTimeArray } from './assertValidTimeArray'
import { assertValidTimeStringFormatting } from './assertValidTimeStringFormatting'
import { timeStringToArrayUnsafe } from './timeStringToArrayUnsafe'

/**
 * Asserts whether the provided string is a valid time string.
 * @remarks
 * This function throws an error if the provided string is not a valid time string.
 * @param string - The string to be validated.
 * @throws Will throw an error if the string is not a valid time string.
 * @example ```ts
 * assertValidTimeString('12:34:56'); // No error
 * assertValidTimeString('25:00:00'); // Throws Error
 * ```
 */
export function assertValidTimeString(string: string): void {
  assertValidTimeStringFormatting(string)
  assertValidTimeArray(timeStringToArrayUnsafe(string))
}
