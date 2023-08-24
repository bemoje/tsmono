import { isValidDateYear } from './isValidDateYear'

describe('isValidDateYear', () => {
  it('identifies valid', () => {
    expect(isValidDateYear(0)).toBe(true)
    expect(isValidDateYear(1)).toBe(true)
    expect(isValidDateYear(100)).toBe(true)
    expect(isValidDateYear(2000)).toBe(true)
    expect(isValidDateYear(2023)).toBe(true)
    expect(isValidDateYear(2100)).toBe(true)
  })

  it('identifies invalid', () => {
    expect(isValidDateYear(-1)).toBe(false)
    expect(isValidDateYear(1.1)).toBe(false)
  })

  it('should return true for valid positive integer years', () => {
    expect(isValidDateYear(2021)).toBe(true)
    expect(isValidDateYear(0)).toBe(true)
    expect(isValidDateYear(10000)).toBe(true)
  })

  it('should return false for negative years', () => {
    expect(isValidDateYear(-1)).toBe(false)
    expect(isValidDateYear(-2021)).toBe(false)
  })

  it('should return false for non-integer years', () => {
    expect(isValidDateYear(2021.5)).toBe(false)
    expect(isValidDateYear(0.1)).toBe(false)
    expect(isValidDateYear(-2021.99)).toBe(false)
  })
})
