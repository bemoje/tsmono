import { isValidMilliseconds } from './isValidMilliseconds'

describe(isValidMilliseconds.name, () => {
  it('should return false for negative values', () => {
    expect(isValidMilliseconds(-1)).toBe(false)
  })

  it('should return false for values greater than 999', () => {
    expect(isValidMilliseconds(1000)).toBe(false)
  })

  it('should return false for decimal values', () => {
    expect(isValidMilliseconds(0.5)).toBe(false)
  })

  it('should return false for NaN', () => {
    expect(isValidMilliseconds(NaN)).toBe(false)
  })

  it('should return false for Infinity', () => {
    expect(isValidMilliseconds(Infinity)).toBe(false)
  })

  it('should return true for valid millisecond values', () => {
    expect(isValidMilliseconds(0)).toBe(true)
    expect(isValidMilliseconds(500)).toBe(true)
    expect(isValidMilliseconds(999)).toBe(true)
  })
})
