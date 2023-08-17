import { weeksSinceDate } from './weeksSinceDate'

describe('weeksSinceDate', () => {
  it('should return the correct number of weeks for a date in the past', () => {
    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - 7)
    expect(weeksSinceDate(pastDate)).toBeCloseTo(1, 1)
  })

  it('should return 0 for the current date', () => {
    const currentDate = new Date()
    expect(weeksSinceDate(currentDate)).toBeCloseTo(0, 1)
  })

  it('should return a negative number for a date in the future', () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 7)
    expect(weeksSinceDate(futureDate)).toBeCloseTo(-1, 1)
  })
})
