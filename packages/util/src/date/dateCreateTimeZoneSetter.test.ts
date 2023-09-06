import { dateCreateTimeZoneSetter } from './dateCreateTimeZoneSetter'

describe(dateCreateTimeZoneSetter.name, () => {
  it('should adjust the time zone of a given date object by a specified number of hours', () => {
    const setTimeZone = dateCreateTimeZoneSetter(2)
    const date = new Date('2021-01-01T00:00:00Z')
    const adjustedDate = setTimeZone(date)
    const expectedDate = new Date('2021-01-01T02:00:00Z').getTime()
    expect(adjustedDate).toBe(expectedDate)
  })

  it('should adjust the time zone of a given date integer by a specified number of hours', () => {
    const setTimeZone = dateCreateTimeZoneSetter(2)
    const date = new Date('2021-01-01T00:00:00Z').getTime()
    const adjustedDate = setTimeZone(date)
    const expectedDate = new Date('2021-01-01T02:00:00Z').getTime()
    expect(adjustedDate).toBe(expectedDate)
  })
})
