import { isLeapYear } from './isLeapYear'

describe('isLeapYear', () => {
  it('identifies leap years', () => {
    expect(isLeapYear(1996)).toBe(true)
    expect(isLeapYear(2000)).toBe(true)
    expect(isLeapYear(2004)).toBe(true)
    expect(isLeapYear(1200)).toBe(true)
  })
  it('identifies non-leap years', () => {
    expect(isLeapYear(1997)).toBe(false)
    expect(isLeapYear(2001)).toBe(false)
    expect(isLeapYear(2005)).toBe(false)
  })
  it('throws on invalid', () => {
    expect(() => isLeapYear(-1)).toThrowError()
    expect(() => isLeapYear(1.1)).toThrowError()
  })
})
