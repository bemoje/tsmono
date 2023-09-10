import { dateWeekDayName } from './dateWeekDayName'

describe(dateWeekDayName.name, () => {
  it('should return the correct weekday name for a given date', () => {
    expect(dateWeekDayName(new Date(2010, 10, 7))).toBe('Sunday')
    expect(dateWeekDayName(new Date(2010, 10, 8))).toBe('Monday')
    expect(dateWeekDayName(new Date(2010, 10, 9))).toBe('Tuesday')
    expect(dateWeekDayName(new Date(2010, 10, 10))).toBe('Wednesday')
    expect(dateWeekDayName(new Date(2010, 10, 11))).toBe('Thursday')
    expect(dateWeekDayName(new Date(2010, 10, 12))).toBe('Friday')
    expect(dateWeekDayName(new Date(2010, 10, 13))).toBe('Saturday')
  })
})
