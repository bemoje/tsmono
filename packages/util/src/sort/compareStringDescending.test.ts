import { compareStringDescending } from './compareStringDescending'

describe('compareStringDescending', () => {
  it('should return a negative number if a is greater than b', () => {
    const result = compareStringDescending('b', 'a')
    expect(result).toBeLessThan(0)
  })

  it('should return a positive number if a is less than b', () => {
    const result = compareStringDescending('a', 'b')
    expect(result).toBeGreaterThan(0)
  })

  it('should return 0 if a and b are equal', () => {
    const result = compareStringDescending('a', 'a')
    expect(result).toBe(0)
  })
})
