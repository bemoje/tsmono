import { isValidTimeString } from './isValidTimeString'

describe(isValidTimeString.name, () => {
  it('should return true for valid time strings', () => {
    expect(isValidTimeString('12:34:56.000')).toBe(true)
    expect(isValidTimeString('00:00:00.000')).toBe(true)
    expect(isValidTimeString('23:59:59.000')).toBe(true)
    expect(isValidTimeString('12:34:56.789')).toBe(true)
  })

  it('should return false for invalid time strings', () => {
    expect(isValidTimeString('')).toBe(false)
    expect(isValidTimeString('12:34')).toBe(false)
    expect(isValidTimeString('aa:bb:cc')).toBe(false)
    expect(isValidTimeString('12:34:56:78')).toBe(false)
    expect(isValidTimeString('-1:34:56')).toBe(false)
    expect(isValidTimeString('24:00:00')).toBe(false)
    expect(isValidTimeString('12:60:00')).toBe(false)
    expect(isValidTimeString('12:34:60')).toBe(false)
    expect(isValidTimeString('12:34:56.1000')).toBe(false)
  })
})
