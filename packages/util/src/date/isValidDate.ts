/**
 * Checks if the provided date and time values form a valid date.
 * @param year The year of the date.
 * @param month The month of the date.
 * @param day The day of the date.
 * @param hour The hour of the time.
 * @param minute The minute of the time.
 * @param second The second of the time.
 * @param millisecond The millisecond of the time.
 * @returns A boolean indicating whether the provided date and time values form a valid date.
 * @example ```ts
 * isValidDate(2021, 12, 31, 23, 59, 59, 999);;
 * //=> true
 * isValidDate('2021', '12', '31', '23', '59', '59', '999');;
 * //=> true
 * isValidDate(2021, 13, 31, 23, 59, 59, 999);;
 * //=> false
 * ```
 */
export function isValidDate(
  year?: number | string,
  month?: number | string,
  day?: number | string,
  hour?: number | string,
  minute?: number | string,
  second?: number | string,
  millisecond?: number | string,
): boolean {
  year = year ? Number(year) : 0
  month = month ? Number(month) : 0
  day = day ? Number(day) : 0
  hour = hour ? Number(hour) : 0
  minute = minute ? Number(minute) : 0
  second = second ? Number(second) : 0
  millisecond = millisecond ? Number(millisecond) : 0
  const d = new Date(year, month - 1, day, hour, minute, second, millisecond)
  return (
    d.getFullYear() === year &&
    d.getMonth() + 1 === month &&
    d.getDate() === day &&
    d.getHours() === hour &&
    d.getMinutes() === minute &&
    d.getSeconds() === second &&
    d.getMilliseconds() === millisecond
  )
}
