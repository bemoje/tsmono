export function dateWeekDayName(date: Date) {
  return names[date.getDay()]
}

const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
