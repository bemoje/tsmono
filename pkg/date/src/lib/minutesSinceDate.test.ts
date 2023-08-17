import { minutesSinceDate } from './minutesSinceDate'

describe('minutesSinceDate', () => {
  it('should return the correct number of minutes since the given date', () => {
    const date = new Date()
    date.setMinutes(date.getMinutes() - 10) // 10 minutes ago

    const result = minutesSinceDate(date)

    // The result should be approximately 10. We use toBeCloseTo because the exact number of minutes
    // might not be exactly 10 due to the time it takes to execute the code.
    expect(result).toBeCloseTo(10, 1)
  })

  it('should return 0 if the given date is the current date', () => {
    const date = new Date()

    const result = minutesSinceDate(date)

    // The result should be approximately 0. We use toBeCloseTo because the exact number of minutes
    // might not be exactly 0 due to the time it takes to execute the code.
    expect(result).toBeCloseTo(0, 1)
  })

  it('should return a negative number if the given date is in the future', () => {
    const date = new Date()
    date.setMinutes(date.getMinutes() + 10) // 10 minutes in the future

    const result = minutesSinceDate(date)

    // The result should be approximately -10. We use toBeCloseTo because the exact number of minutes
    // might not be exactly -10 due to the time it takes to execute the code.
    expect(result).toBeCloseTo(-10, 1)
  })
})
