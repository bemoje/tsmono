import { dateAdjustHoursBy } from './dateAdjustHoursBy'

describe(dateAdjustHoursBy.name, () => {
  it('should adjust the date by the specified number of hours', () => {
    const date = new Date('2021-01-01T00:00:00')
    const adjustedDate = dateAdjustHoursBy(date, 2)
    expect(adjustedDate).toBe(date.valueOf() + 1000 * 60 * 60 * 2)
  })

  it('should handle negative values for hours', () => {
    const date = new Date('2021-01-01T00:00:00')
    const adjustedDate = dateAdjustHoursBy(date, -2)
    expect(adjustedDate).toBe(date.valueOf() - 1000 * 60 * 60 * 2)
  })

  it('should handle decimal values for hours', () => {
    const date = new Date('2021-01-01T00:00:00')
    const adjustedDate = dateAdjustHoursBy(date, 1.5)
    expect(adjustedDate).toBe(date.valueOf() + 1000 * 60 * 60 * 1.5)
  })

  it('should handle integer values for date', () => {
    const date = new Date('2021-01-01T00:00:00').valueOf()
    const adjustedDate = dateAdjustHoursBy(date, 2)
    expect(adjustedDate).toBe(date + 1000 * 60 * 60 * 2)
  })
})
