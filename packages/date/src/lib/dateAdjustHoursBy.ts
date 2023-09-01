/**
 * Adjusts the given date by the specified number of hours.
 * @param date - The date to adjust, represented as an integer or Date instance.
 * @param hours - The number of hours. Decimal points and negative values are accepted.
 * @returns The adjusted date, represented as a number.
 */
export function dateAdjustHoursBy(date: number | Date, hours: number): number {
  return Math.floor(date.valueOf() + 1000 * 60 * 60 * hours)
}
