import { daysSinceDate } from './daysSinceDate'

describe('daysSinceDate', () => {
  it('should return a positive number if the date is in the past', () => {
    const date = new Date('2021-01-01')
    expect(daysSinceDate(date)).toBeGreaterThan(0)
  })

  it('should return a negative number if the date is in the future', () => {
    const date = new Date('2050-01-01')
    expect(daysSinceDate(date)).toBeLessThan(0)
  })

  it('should return the correct number of days since the given date', () => {
    const now = new Date()
    const oneDayAgo = new Date(now.getTime() - 1000 * 60 * 60 * 24)
    const twoDaysAgo = new Date(now.getTime() - 2 * 1000 * 60 * 60 * 24)

    expect(daysSinceDate(oneDayAgo)).toBeCloseTo(1, 0)
    expect(daysSinceDate(twoDaysAgo)).toBeCloseTo(2, 0)
  })

  it('should return 0 if the given date is in the future', () => {
    const now = new Date()
    const oneDayInFuture = new Date(now.getTime() + 1000 * 60 * 60 * 24)

    expect(daysSinceDate(oneDayInFuture)).toBeLessThanOrEqual(0)
  })

  it('should handle the edge case where the given date is the current date', () => {
    const now = new Date()

    expect(daysSinceDate(now)).toBeCloseTo(0, 0)
  })
})
