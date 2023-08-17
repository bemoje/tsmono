import { isInteger } from './isInteger'

describe('isInteger', () => {
  it('should return true for integer values', () => {
    expect(isInteger(0)).toBe(true)
    expect(isInteger(1)).toBe(true)
    expect(isInteger(-1)).toBe(true)
    expect(isInteger(1234567890)).toBe(true)
  })

  it('should return false for non-integer values', () => {
    expect(isInteger(0.1)).toBe(false)
    expect(isInteger(-0.1)).toBe(false)
    expect(isInteger(Math.PI)).toBe(false)
  })

  it('should return false for NaN', () => {
    expect(isInteger(NaN)).toBe(false)
  })

  it('should return false for Infinity', () => {
    expect(isInteger(Infinity)).toBe(false)
    expect(isInteger(-Infinity)).toBe(false)
  })
})
