/**
 * This function takes a date object and returns a string in ISO format suitable for filenames.
 * If no date is provided, it uses the current date and time.
 * @param date The date object to be converted. Defaults to the current date and time.
 * @returns A string in the format "YYYY-MM-DD-HH-MM-SS-SSS".
 * @example ```ts
 * isoDateTimestampForFilename(new Date('2022-01-01T00:00:00Z'));;
 * //=> "2022-01-01-00-00-00-000"
 * ```
 */
export function isoDateTimestampForFilename(date = new Date()): string {
  return date
    .toISOString()
    .replace(/[-:T.]/g, '-')
    .replace('Z', '')
}
