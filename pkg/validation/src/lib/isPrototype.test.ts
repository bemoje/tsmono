import { isPrototype } from './isPrototype'

describe('isPrototype', () => {
  it('should return false for null', () => {
    expect(isPrototype(null)).toBe(false)
  })

  it('should return false for non-object types', () => {
    expect(isPrototype(123)).toBe(false)
    expect(isPrototype('string')).toBe(false)
    expect(isPrototype(true)).toBe(false)
    expect(isPrototype(undefined)).toBe(false)
  })

  it('should return false for objects without a constructor', () => {
    const obj = Object.create(null)
    expect(isPrototype(obj)).toBe(false)
  })

  it('should return false for objects where prototype does not equal the object', () => {
    const obj = {}
    expect(isPrototype(obj)).toBe(false)
  })
})
