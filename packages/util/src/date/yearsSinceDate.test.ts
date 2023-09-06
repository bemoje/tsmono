import { yearsSinceDate } from './yearsSinceDate'

describe('yearsSinceDate', () => {
  it('should return the correct number of years since the provided date', () => {
    const date = new Date()
    date.setFullYear(date.getFullYear() - 5) // 5 years ago
    expect(yearsSinceDate(date)).toBeCloseTo(5, 0)
  })

  it('should return 0 if the provided date is the current date', () => {
    const date = new Date()
    expect(yearsSinceDate(date)).toBeCloseTo(0, 0)
  })

  it('should return a negative number if the provided date is in the future', () => {
    const date = new Date()
    date.setFullYear(date.getFullYear() + 5) // 5 years in the future
    expect(yearsSinceDate(date)).toBeCloseTo(-5, 0)
  })
})
