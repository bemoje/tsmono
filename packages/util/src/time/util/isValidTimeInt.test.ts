import { isValidTimeInt } from './isValidTimeInt'

describe(isValidTimeInt.name, () => {
  it('should return true if the number is a valid time integer', () => {
    expect(isValidTimeInt(0)).toBe(true)
    expect(isValidTimeInt(86399999)).toBe(true)
  })

  it('should return false if the number is less than 0 or greater than 86399999', () => {
    expect(isValidTimeInt(-1)).toBe(false)
    expect(isValidTimeInt(86400000)).toBe(false)
    expect(isValidTimeInt(100000000)).toBe(false)
  })

  it('should return false if the number is not an integer', () => {
    expect(isValidTimeInt(0.5)).toBe(false)
    expect(isValidTimeInt(100.25)).toBe(false)
    expect(isValidTimeInt(12345678.9)).toBe(false)
  })
})
