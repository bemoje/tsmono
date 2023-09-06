import { isValidMinutes } from './isValidMinutes'

describe(isValidMinutes.name, () => {
  it('should return true when the number is a valid minute value', () => {
    expect(isValidMinutes(0)).toBe(true)
    expect(isValidMinutes(30)).toBe(true)
    expect(isValidMinutes(59)).toBe(true)
  })

  it('should return false when the number is not an integer', () => {
    expect(isValidMinutes(0.5)).toBe(false)
    expect(isValidMinutes(11.23)).toBe(false)
    expect(isValidMinutes(-1.5)).toBe(false)
  })

  it('should return false when the number is less than 0', () => {
    expect(isValidMinutes(-1)).toBe(false)
    expect(isValidMinutes(-10)).toBe(false)
    expect(isValidMinutes(-59)).toBe(false)
  })

  it('should return false when the number is greater than 59', () => {
    expect(isValidMinutes(60)).toBe(false)
    expect(isValidMinutes(99)).toBe(false)
    expect(isValidMinutes(100)).toBe(false)
  })

  it('should return false when the number is outside the valid range', () => {
    expect(isValidMinutes(-100)).toBe(false)
    expect(isValidMinutes(1000)).toBe(false)
  })
})
