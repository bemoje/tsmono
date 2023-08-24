/**
 * Checks if a given string is in a valid time string format.
 * The valid format is 'HH:MM:SS,SSS' or 'HH:MM:SS.SSS'.
 * @param string - The string to be checked.
 * @returns A boolean indicating whether the string is in a valid time string format.
 * @example ```ts
 * isValidTimeStringFormatting('12:34:56,789'); // returns true
 * isValidTimeStringFormatting('12:34:56.789'); // returns true
 * isValidTimeStringFormatting('12:34:56'); // returns false
 * ```
 */
export function isValidTimeStringFormatting(string: string): boolean {
  return /^\s*([0-1][0-9]|2[0-3])[^0-9-]+[0-5][0-9][^0-9-]+[0-5][0-9][^0-9-]+[0-9][0-9][0-9]\s*$/.test(string)
}
