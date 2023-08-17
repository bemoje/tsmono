/**
 * Returns a Date object representing a date that is a certain number of days in the past.
 * @param days The number of days ago for the date to represent.
 * @returns A Date object representing the date that is the specified number of days in the past.
 * @example ```ts
 * dateDaysAgo(5);;
 * //=> result
 * ```
 */
export function dateDaysAgo(days: number): Date {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}
