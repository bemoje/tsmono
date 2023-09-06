import { hoursSinceDate } from './hoursSinceDate'

describe('hoursSinceDate', () => {
  it('should return the correct number of hours since the given date', () => {
    const date = new Date()
    date.setHours(date.getHours() - 5)

    const result = hoursSinceDate(date)

    // The result should be approximately 5, but due to the time it takes to execute the code, it might be slightly more than 5.
    expect(result).toBeCloseTo(5, 0)
  })

  it('should return 0 if the given date is the current date', () => {
    const date = new Date()

    const result = hoursSinceDate(date)

    // The result should be approximately 0, but due to the time it takes to execute the code, it might be slightly more than 0.
    expect(result).toBeCloseTo(0, 0)
  })

  it('should return a negative number if the given date is in the future', () => {
    const date = new Date()
    date.setHours(date.getHours() + 5)

    const result = hoursSinceDate(date)

    // The result should be approximately -5, but due to the time it takes to execute the code, it might be slightly less than -5.
    expect(result).toBeCloseTo(-5, 0)
  })
})
