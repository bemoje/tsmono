import { isValidTimeStringFormatting } from './isValidTimeStringFormatting'

/**
 * Checks if a given string is a valid time string.
 * @remarks
 * This function is part of the TimeUtils library.
 * @param string - The string to be checked.
 * @returns A boolean indicating whether the string is a valid time string.
 * @throws Will throw an error if the input string is not a string.
 * @example ```ts
 * isValidTimeString("12:34:56") // returns true
 * isValidTimeString("25:00:00") // returns false
 * ```
 */
export function isValidTimeString(string: string): boolean {
  return !!string && isValidTimeStringFormatting(string)
}
