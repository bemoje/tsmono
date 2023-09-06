import { compareNumeric } from './compareNumeric'

describe('compareNumeric', () => {
  it('should return a negative number if the first value is less than the second value', () => {
    expect(compareNumeric(1, 2)).toBeLessThan(0)
    expect(compareNumeric(-1, 0)).toBeLessThan(0)
    expect(compareNumeric(BigInt(1), BigInt(2))).toBeLessThan(0)
    expect(compareNumeric(false, true)).toBeLessThan(0)
  })

  it('should return a positive number if the first value is greater than the second value', () => {
    expect(compareNumeric(2, 1)).toBeGreaterThan(0)
    expect(compareNumeric(0, -1)).toBeGreaterThan(0)
    expect(compareNumeric(BigInt(2), BigInt(1))).toBeGreaterThan(0)
    expect(compareNumeric(true, false)).toBeGreaterThan(0)
  })

  it('should return zero if the values are equal', () => {
    expect(compareNumeric(1, 1)).toEqual(0)
    expect(compareNumeric(-1, -1)).toEqual(0)
    expect(compareNumeric(BigInt(1), BigInt(1))).toEqual(0)
    expect(compareNumeric(false, false)).toEqual(0)
  })
})
