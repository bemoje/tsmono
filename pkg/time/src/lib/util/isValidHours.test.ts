import { isValidHours } from './isValidHours'

describe(isValidHours.name, () => {
  it('should return true for valid hours', () => {
    expect(isValidHours(0)).toBe(true)
    expect(isValidHours(12)).toBe(true)
    expect(isValidHours(23)).toBe(true)
  })

  it('should return false for non-integer hours', () => {
    expect(isValidHours(0.5)).toBe(false)
    expect(isValidHours(12.3)).toBe(false)
    expect(isValidHours(23.9)).toBe(false)
  })

  it('should return false for negative hours', () => {
    expect(isValidHours(-1)).toBe(false)
    expect(isValidHours(-12)).toBe(false)
    expect(isValidHours(-23)).toBe(false)
  })

  it('should return false for hours greater than 23', () => {
    expect(isValidHours(24)).toBe(false)
    expect(isValidHours(100)).toBe(false)
    expect(isValidHours(1000)).toBe(false)
  })
})
