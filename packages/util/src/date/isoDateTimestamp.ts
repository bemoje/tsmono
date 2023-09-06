/**
 * Converts a given date to an ISO date timestamp string.
 * If no date is provided, the current date and time will be used.
 * @param - The date to convert. Defaults to the current date and time.
 * @returns The ISO date timestamp string.
 * @example ```ts
 * isoDateTimestamp(new Date('2020-01-01T00:00:00Z'));;
 * //=> "20200101T000000Z"
 * ```
 * @example ```ts
 * const timestamp = isoDateTimestamp();
 * console.log(timestamp); // Outputs the current date and time in ISO format, e.g. "20210520T102030Z"
 * ```
 */
export function isoDateTimestamp(date = new Date()): string {
  return date.toISOString().replace(/\D/g, '')
}
