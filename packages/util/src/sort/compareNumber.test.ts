import { compareNumber } from './compareNumber'

describe('compareNumber', () => {
  it('should return a negative number if the first value is less than the second value', () => {
    expect(compareNumber(2, 1)).toBeGreaterThan(0)
    expect(compareNumber(10, 5)).toBeGreaterThan(0)
    expect(compareNumber(-3, -2)).toBeLessThan(0)
  })

  it('should return a positive number if the first value is greater than the second value', () => {
    expect(compareNumber(1, 2)).toBeLessThan(0)
    expect(compareNumber(5, 10)).toBeLessThan(0)
    expect(compareNumber(-2, -3)).toBeGreaterThan(0)
  })

  it('should return zero if the values are equal', () => {
    expect(compareNumber(1, 1)).toEqual(0)
    expect(compareNumber(-1, -1)).toEqual(0)
    expect(compareNumber(0, 0)).toEqual(0)
  })
})
