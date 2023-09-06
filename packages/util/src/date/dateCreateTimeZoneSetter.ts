import { dateAdjustHoursBy } from './dateAdjustHoursBy'

/**
 * Creates a function that adjusts the time zone of a given date object by a specified number of hours.
 * @param hours - The distance from UTC time.
 * @returns A function that takes a date-instance or date-integer and adjusts it by the given number of hours, and returns it as a date-integer.
 */
export function dateCreateTimeZoneSetter(hours: number): (date: number | Date) => number {
  return function setTimeZone(date: number | Date): number {
    return dateAdjustHoursBy(date, hours)
  }
}
