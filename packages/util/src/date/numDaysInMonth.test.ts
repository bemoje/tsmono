import { numDaysInMonth } from './numDaysInMonth'

describe('numDaysInMonth', () => {
  it('works for all months', () => {
    expect(numDaysInMonth(1)).toBe(31)
    expect(numDaysInMonth(2)).toBe(28)
    expect(numDaysInMonth(3)).toBe(31)
    expect(numDaysInMonth(4)).toBe(30)
    expect(numDaysInMonth(5)).toBe(31)
    expect(numDaysInMonth(6)).toBe(30)
    expect(numDaysInMonth(7)).toBe(31)
    expect(numDaysInMonth(8)).toBe(31)
    expect(numDaysInMonth(9)).toBe(30)
    expect(numDaysInMonth(10)).toBe(31)
    expect(numDaysInMonth(11)).toBe(30)
    expect(numDaysInMonth(12)).toBe(31)
  })
  it('handles february in leap year', () => {
    expect(numDaysInMonth(2, 2024)).toBe(29)
    expect(numDaysInMonth(2, 2025)).toBe(28)
  })
  it('throws on invalid', () => {
    expect(() => numDaysInMonth(0)).toThrowError()
    expect(() => numDaysInMonth(13)).toThrowError()
  })
  it('throws on invalid', () => {
    expect(() => numDaysInMonth(-1)).toThrowError()
    expect(() => numDaysInMonth(1.1)).toThrowError()
  })
})
