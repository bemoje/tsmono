import { msSinceDate } from './msSinceDate'

describe('msSinceDate', () => {
  it('should return the correct number of milliseconds since the provided date', () => {
    const date = new Date()
    date.setSeconds(date.getSeconds() - 5) // 5 seconds ago

    const result = msSinceDate(date)

    // The result should be approximately 5000 milliseconds.
    // We use toBeCloseTo because there might be a small delay between when we set the date and when we call the function.
    expect(result).toBeCloseTo(5000, -2)
  })
})
