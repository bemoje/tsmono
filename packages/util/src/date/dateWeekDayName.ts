/**
 * Returns the weekday name of a given date.
 *
 * @param date - The date object from which the weekday name is to be extracted.
 * @returns The weekday name corresponding to the date.
 *
 * @example
 * dateWeekDayName(new Date(2010, 10, 7))
 * //=> 'Sunday'
 */
export function dateWeekDayName(date: Date) {
  return names[date.getDay()]
}

const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
