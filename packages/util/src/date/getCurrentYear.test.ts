import { getCurrentYear } from './getCurrentYear'

describe('getCurrentYear', () => {
  it('should return the current year', () => {
    const currentYear = new Date().getUTCFullYear()
    expect(getCurrentYear()).toEqual(currentYear)
  })
})
