import { isValidTime } from './isValidTime'

describe(isValidTime.name, () => {
  it('should return true for valid time values', () => {
    expect(isValidTime(12, 30, 45, 500)).toBe(true)
    expect(isValidTime(0, 0, 0, 0)).toBe(true)
    expect(isValidTime(23, 59, 59, 999)).toBe(true)
  })

  it('should return false if hours is out of range', () => {
    expect(isValidTime(-1, 30, 45, 500)).toBe(false)
    expect(isValidTime(24, 30, 45, 500)).toBe(false)
  })

  it('should return false if minutes is out of range', () => {
    expect(isValidTime(12, -1, 45, 500)).toBe(false)
    expect(isValidTime(12, 60, 45, 500)).toBe(false)
  })

  it('should return false if seconds is out of range', () => {
    expect(isValidTime(12, 30, -1, 500)).toBe(false)
    expect(isValidTime(12, 30, 60, 500)).toBe(false)
  })

  it('should return false if milliseconds is out of range', () => {
    expect(isValidTime(12, 30, 45, -1)).toBe(false)
    expect(isValidTime(12, 30, 45, 1000)).toBe(false)
  })

  it('should return false if any value is not an integer', () => {
    expect(isValidTime(12.5, 30, 45, 500)).toBe(false)
    expect(isValidTime(12, 30.5, 45, 500)).toBe(false)
    expect(isValidTime(12, 30, 45.5, 500)).toBe(false)
    expect(isValidTime(12, 30, 45, 500.5)).toBe(false)
  })

  it('should return false if the combination of values represents an invalid time', () => {
    expect(isValidTime(12, 30, 45, 1000)).toBe(false)
    expect(isValidTime(12, 30, 60, 500)).toBe(false)
    expect(isValidTime(12, 60, 45, 500)).toBe(false)
    expect(isValidTime(24, 0, 0, 0)).toBe(false)
  })
})
