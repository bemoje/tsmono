import { objReverse } from './objReverse'

describe('objReverse', () => {
  it('should return an empty object when given an empty object', () => {
    const obj = {}
    const result = objReverse(obj)
    expect(result).toEqual({})
  })

  it('should return the same object when given an object with one property', () => {
    const obj = { a: 1 }
    const result = objReverse(obj)
    expect(result).toEqual({ a: 1 })
  })

  it('should return an object with properties in reverse order when given an object with multiple properties', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = objReverse(obj)
    expect(result).toEqual({ c: 3, b: 2, a: 1 })
  })

  it('should not mutate the original object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const copy = { ...obj }
    objReverse(obj)
    expect(obj).toEqual(copy)
  })

  it('should handle objects with non-string keys', () => {
    const obj = { 1: 'a', 2: 'b', 3: 'c' }
    const result = objReverse(obj)
    expect(result).toEqual({ 3: 'c', 2: 'b', 1: 'a' })
  })
})
