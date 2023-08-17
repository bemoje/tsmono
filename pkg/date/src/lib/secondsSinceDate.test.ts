import { secondsSinceDate } from './secondsSinceDate'

describe('secondsSinceDate', () => {
  it('should return the number of seconds since the given date', () => {
    const date = new Date()
    date.setSeconds(date.getSeconds() - 5) // 5 seconds ago

    const result = secondsSinceDate(date)

    // The result should be approximately 5 seconds.
    // We use toBeCloseTo because there might be a slight delay between when we set the date and when we call the function.
    expect(result).toBeCloseTo(5, 0)
  })

  it('should return a larger number for a date further in the past', () => {
    const date1 = new Date()
    date1.setSeconds(date1.getSeconds() - 5) // 5 seconds ago

    const date2 = new Date()
    date2.setSeconds(date2.getSeconds() - 10) // 10 seconds ago

    const result1 = secondsSinceDate(date1)
    const result2 = secondsSinceDate(date2)

    expect(result2).toBeGreaterThan(result1)
  })

  it('should return negative value for a date in the future', () => {
    const date = new Date()
    date.setSeconds(date.getSeconds() + 10) // 5 seconds in the future

    const result = secondsSinceDate(date)

    expect(result).toBe(Math.round(-10))
  })
})
