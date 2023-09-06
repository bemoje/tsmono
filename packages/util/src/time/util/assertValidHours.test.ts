import { assertValidHours } from './assertValidHours'
import { isValidHours } from './isValidHours'

describe('isValidHours', () => {
  it('should return true if number is a valid hour', () => {
    expect(isValidHours(0)).toBe(true)
    expect(isValidHours(12)).toBe(true)
    expect(isValidHours(23)).toBe(true)
  })

  it('should return false if number is not a valid hour', () => {
    expect(isValidHours(-1)).toBe(false)
    expect(isValidHours(24)).toBe(false)
    expect(isValidHours(5.5)).toBe(false)
  })
})

describe(assertValidHours.name, () => {
  it('should not throw an error if number is a valid hour', () => {
    expect(() => assertValidHours(0)).not.toThrow()
    expect(() => assertValidHours(12)).not.toThrow()
    expect(() => assertValidHours(23)).not.toThrow()
  })

  it('should throw an error if number is not a valid hour', () => {
    expect(() => assertValidHours(-1)).toThrow()
    expect(() => assertValidHours(24)).toThrow()
    expect(() => assertValidHours(5.5)).toThrow()
  })
})
