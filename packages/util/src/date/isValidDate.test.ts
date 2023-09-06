import { isValidDate } from './isValidDate'

describe('isValidDate', () => {
  it('should return true for valid date and time', () => {
    expect(isValidDate(2022, 1, 1, 0, 0, 0, 0)).toBe(true)
  })

  it('should return false for invalid date', () => {
    expect(isValidDate(2022, 2, 30)).toBe(false)
  })

  it('should return false for invalid time', () => {
    expect(isValidDate(2022, 1, 1, 25, 0, 0, 0)).toBe(false)
  })

  it('should return true for valid date and time with string inputs', () => {
    expect(isValidDate('2022', '1', '1', '0', '0', '0', '0')).toBe(true)
  })

  it('should return false for invalid date with string inputs', () => {
    expect(isValidDate('2022', '2', '30')).toBe(false)
  })

  it('should return false for invalid time with string inputs', () => {
    expect(isValidDate('2022', '1', '1', '25', '0', '0', '0')).toBe(false)
  })

  it('should return false for non-numeric string inputs', () => {
    expect(isValidDate('2022', 'January', '1', '0', '0', '0', '0')).toBe(false)
  })

  it('should return false for undefined inputs', () => {
    expect(isValidDate(undefined, undefined, undefined, undefined, undefined, undefined, undefined)).toBe(false)
  })
})
