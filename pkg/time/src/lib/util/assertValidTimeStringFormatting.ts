import { isValidTimeStringFormatting } from './isValidTimeStringFormatting'

/**
 * Asserts that the provided string is a valid time string format.
 * Throws an error if the string is not in the format hh:mm:ss[,|.]mmm.
 * @param string - The string to be validated.
 * @throws Will throw an error if the string is not in the correct format.
 * @example ```ts
 * assertValidTimeStringFormatting('12:34:56.789'); // No error thrown
 * assertValidTimeStringFormatting('12:34:56,789'); // No error thrown
 * assertValidTimeStringFormatting('12:34:56'); // Throws Error
 * ```
 */
export function assertValidTimeStringFormatting(string: string): void {
  if (!isValidTimeStringFormatting(string))
    throw new Error('Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: ' + string)
}
