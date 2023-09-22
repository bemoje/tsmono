/**
 * Converts an ISO date string into a more readable format.
 *
 * @param iso - The ISO date string to be converted. Defaults to the current date and time.
 * @param dateTimeSeparator - The character to use as a separator between the date and time. Defaults to '_'.
 * @param precision - The level of precision for the date and time. Can be 'year', 'month', 'day', 'hour', 'minute', 'second', or 'millisecond'. Defaults to 'millisecond'.
 * @returns The converted date string.
 *
 * @example
 * prettyIsoDateString('2020-02-03T14:01:04.437Z', '_', 'minute');
 * //=> 2020.02.03_14.01
 */
export function prettyIsoDateString(
  iso: string = new Date().toISOString(),
  dateTimeSeparator = '_',
  precision: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond' = 'millisecond'
) {
  return iso.substring(0, map[precision]).replace(/T/, dateTimeSeparator).replace(/-|:/g, '.')
}

const map = {
  year: 4,
  month: 7,
  day: 10,
  hour: 13,
  minute: 16,
  second: 19,
  millisecond: 23,
}
