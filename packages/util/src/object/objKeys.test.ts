import { objKeys } from './objKeys'

describe('objKeys', () => {
  it('should return an iterable of all the keys in the given object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const keys = Array.from(objKeys(obj))
    expect(keys).toEqual(['a', 'b', 'c'])
  })

  it('should return an empty array when an empty object is provided', () => {
    const obj = {}
    const keys = Array.from(objKeys(obj))
    expect(keys).toEqual([])
  })

  it('should return keys for an object with numeric keys', () => {
    const obj = { 1: 'a', 2: 'b', 3: 'c' }
    const keys = Array.from(objKeys(obj))
    expect(keys).toEqual(['1', '2', '3'])
  })
})
