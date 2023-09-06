import { isValidDateDay } from './isValidDateDay'

describe('isValidDateDay', () => {
  it('identifies valid', () => {
    expect(isValidDateDay(1, 1)).toBe(true)
    expect(isValidDateDay(5, 1)).toBe(true)
    expect(isValidDateDay(31, 1)).toBe(true)
  })
  it('identifies invalid', () => {
    expect(isValidDateDay(0, 1)).toBe(false)
    expect(isValidDateDay(32, 1)).toBe(false)
  })
  it('return false on non integer', () => {
    expect(isValidDateDay(1.1, 1)).toBe(false)
    expect(isValidDateDay(1, 1.1)).toBe(false)
    expect(isValidDateDay(1, 1, 1.1)).toBe(false)
  })
})
