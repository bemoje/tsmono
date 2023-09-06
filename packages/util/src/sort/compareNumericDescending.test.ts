import { compareNumericDescending } from './compareNumericDescending'

describe('compareNumericDescending', () => {
  it('should return a negative number if the first value is greater than the second value', () => {
    expect(compareNumericDescending(2, 1)).toBeLessThan(0)
    expect(compareNumericDescending(0, -1)).toBeLessThan(0)
    expect(compareNumericDescending(BigInt(2), BigInt(1))).toBeLessThan(0)
    expect(compareNumericDescending(true, false)).toBeLessThan(0)
  })

  it('should return a positive number if the first value is less than the second value', () => {
    expect(compareNumericDescending(1, 2)).toBeGreaterThan(0)
    expect(compareNumericDescending(-1, 0)).toBeGreaterThan(0)
    expect(compareNumericDescending(BigInt(1), BigInt(2))).toBeGreaterThan(0)
    expect(compareNumericDescending(false, true)).toBeGreaterThan(0)
  })

  it('should return zero if the values are equal', () => {
    expect(compareNumericDescending(1, 1)).toEqual(0)
    expect(compareNumericDescending(-1, -1)).toEqual(0)
    expect(compareNumericDescending(BigInt(1), BigInt(1))).toEqual(0)
    expect(compareNumericDescending(false, false)).toEqual(0)
  })
})
