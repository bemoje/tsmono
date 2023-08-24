import { monthsSinceDate } from './monthsSinceDate'

describe('monthsSinceDate', () => {
  it('should return the correct number of months since the provided date', () => {
    const date = new Date()
    date.setMonth(date.getMonth() - 3) // 3 months ago
    const result = monthsSinceDate(date)
    expect(result).toBeCloseTo(3, 0) // The result should be close to 3
  })

  it('should return 0 if the provided date is the current date', () => {
    const date = new Date()
    const result = monthsSinceDate(date)
    expect(result).toBeCloseTo(0, 0) // The result should be close to 0
  })

  it('should return a negative number if the provided date is in the future', () => {
    const date = new Date()
    date.setMonth(date.getMonth() + 3) // 3 months in the future
    const result = monthsSinceDate(date)
    expect(result).toBeLessThan(0) // The result should be less than 0
  })

  it('should return the correct number of months for dates in the past', () => {
    const date = new Date('2000-01-01')
    const result = monthsSinceDate(date)
    expect(result).toBeGreaterThan(0) // The result should be greater than 0
  })
})
