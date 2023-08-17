import { isObject } from './isObject'

describe('isObject function', () => {
  it('should return true for an object', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ key: 'value' })).toBe(true)
  })

  it('should return false for null', () => {
    expect(isObject(null)).toBe(false)
  })

  it('should return false for undefined', () => {
    expect(isObject(undefined)).toBe(false)
  })

  it('should return false for a number', () => {
    expect(isObject(123)).toBe(false)
  })

  it('should return false for a string', () => {
    expect(isObject('test')).toBe(false)
  })

  it('should return false for a boolean', () => {
    expect(isObject(true)).toBe(false)
    expect(isObject(false)).toBe(false)
  })

  it('should return true for an array', () => {
    expect(isObject([])).toBe(true)
    expect(isObject([1, 2, 3])).toBe(true)
  })

  it('should return true for a function', () => {
    expect(isObject(() => 1)).toBe(false)
  })
})
