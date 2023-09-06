import { isIterable } from './isIterable'

describe('isIterable', () => {
  it('should return true for an array', () => {
    expect(isIterable([1, 2, 3])).toBe(true)
  })

  it('should return true for a string', () => {
    expect(isIterable('hello')).toBe(true)
  })

  it('should return true for a map', () => {
    expect(isIterable(new Map())).toBe(true)
  })

  it('should return true for a set', () => {
    expect(isIterable(new Set())).toBe(true)
  })

  it('should return false for a number', () => {
    expect(isIterable(123)).toBe(false)
  })

  it('should return false for a boolean', () => {
    expect(isIterable(true)).toBe(false)
  })

  it('should return false for null', () => {
    expect(isIterable(null)).toBe(false)
  })

  it('should return false for undefined', () => {
    expect(isIterable(undefined)).toBe(false)
  })

  it('should return false for an object without Symbol.iterator', () => {
    expect(isIterable({})).toBe(false)
  })

  it('should return false for a function', () => {
    expect(isIterable(() => 1)).toBe(false)
  })

  it('should return true for an object with Symbol.iterator', () => {
    const iterableObject = {
      [Symbol.iterator]: function* () {
        yield 1
        yield 2
        yield 3
      },
    }
    expect(isIterable(iterableObject)).toBe(true)
  })
})
