import { compareNumberDescending } from './compareNumberDescending'

describe('compareNumberDescending', () => {
  it('should return a negative number if the first value is greater than the second value', () => {
    expect(compareNumberDescending(2, 1)).toBeLessThan(0)
    expect(compareNumberDescending(10, 5)).toBeLessThan(0)
    expect(compareNumberDescending(-3, -2)).toBeGreaterThan(0)
  })

  it('should return a positive number if the first value is less than the second value', () => {
    expect(compareNumberDescending(1, 2)).toBeGreaterThan(0)
    expect(compareNumberDescending(5, 10)).toBeGreaterThan(0)
    expect(compareNumberDescending(-2, -3)).toBeLessThan(0)
  })

  it('should return zero if the values are equal', () => {
    expect(compareNumberDescending(1, 1)).toEqual(0)
    expect(compareNumberDescending(-1, -1)).toEqual(0)
    expect(compareNumberDescending(0, 0)).toEqual(0)
  })
})
