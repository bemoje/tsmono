import { objKeysArray } from './objKeysArray'

describe('objKeysArray', () => {
  it('should return an array of keys from the provided object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = objKeysArray(obj)
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('should return an empty array if the object is empty', () => {
    const obj = {}
    const result = objKeysArray(obj)
    expect(result).toEqual([])
  })

  it('should return an array of keys when object has numeric keys', () => {
    const obj = { 1: 'a', 2: 'b', 3: 'c' }
    const result = objKeysArray(obj)
    expect(result).toEqual(['1', '2', '3'])
  })
})
