import { isValidTimeArray } from './isValidTimeArray'

describe(isValidTimeArray.name, () => {
  it('should return false if the array has less than 4 elements', () => {
    expect(isValidTimeArray([])).toBe(false)
    expect(isValidTimeArray([1, 2])).toBe(false)
    expect(isValidTimeArray([1, 2, 3])).toBe(false)
  })

  it('should return false if the array has more than 4 elements', () => {
    expect(isValidTimeArray([1, 2, 3, 4, 5])).toBe(false)
  })

  it('should return false if hours is invalid', () => {
    expect(isValidTimeArray([-1, 0, 0, 0])).toBe(false)
    expect(isValidTimeArray([24, 0, 0, 0])).toBe(false)
    expect(isValidTimeArray([1.5, 0, 0, 0])).toBe(false)
    expect(isValidTimeArray(['2', 0, 0, 0] as any)).toBe(false)
  })

  it('should return false if minutes is invalid', () => {
    expect(isValidTimeArray([0, -1, 0, 0])).toBe(false)
    expect(isValidTimeArray([0, 60, 0, 0])).toBe(false)
    expect(isValidTimeArray([0, 1.5, 0, 0])).toBe(false)
    expect(isValidTimeArray([0, '2' as any, 0, 0])).toBe(false)
  })

  it('should return false if seconds is invalid', () => {
    expect(isValidTimeArray([0, 0, -1, 0])).toBe(false)
    expect(isValidTimeArray([0, 0, 60, 0])).toBe(false)
    expect(isValidTimeArray([0, 0, 1.5, 0])).toBe(false)
    expect(isValidTimeArray([0, 0, '2' as any, 0])).toBe(false)
  })

  it('should return false if milliseconds is invalid', () => {
    expect(isValidTimeArray([0, 0, 0, -1])).toBe(false)
    expect(isValidTimeArray([0, 0, 0, 1000])).toBe(false)
    expect(isValidTimeArray([0, 0, 0, 1.5])).toBe(false)
    expect(isValidTimeArray([0, 0, 0, '2' as any])).toBe(false)
  })

  it('should return true if all elements are valid', () => {
    expect(isValidTimeArray([0, 0, 0, 0])).toBe(true)
    expect(isValidTimeArray([23, 59, 59, 999])).toBe(true)
  })
})
