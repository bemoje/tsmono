import { isValidDateMonth } from './isValidDateMonth'

describe('isValidDateMonth', () => {
  it('identifies valid', () => {
    expect(isValidDateMonth(1)).toBe(true)
    expect(isValidDateMonth(5)).toBe(true)
    expect(isValidDateMonth(12)).toBe(true)
  })
  it('identifies invalid', () => {
    expect(isValidDateMonth(0)).toBe(false)
    expect(isValidDateMonth(13)).toBe(false)
  })

  it('should return true for valid month numbers', () => {
    expect(isValidDateMonth(1)).toBe(true)
    expect(isValidDateMonth(6)).toBe(true)
    expect(isValidDateMonth(12)).toBe(true)
  })

  it('should return false for month numbers less than 1', () => {
    expect(isValidDateMonth(0)).toBe(false)
    expect(isValidDateMonth(-1)).toBe(false)
  })

  it('should return false for month numbers greater than 12', () => {
    expect(isValidDateMonth(13)).toBe(false)
    expect(isValidDateMonth(100)).toBe(false)
  })

  it('should return false for non-integer month numbers', () => {
    expect(isValidDateMonth(1.5)).toBe(false)
    expect(isValidDateMonth(6.7)).toBe(false)
  })
})
