import { objMapKeys } from './objMapKeys'

describe('objMapKeys', () => {
  it('should map keys of an object using a callback function', () => {
    const object = { a: 1, b: 2, c: 3 }
    const callback = (key: string, value: number) => key.toUpperCase()
    const result = objMapKeys(object, callback)
    expect(result).toEqual({ A: 1, B: 2, C: 3 })
  })

  it('should return an empty object when the input object is empty', () => {
    const object = {}
    const callback = (key: string, value: number) => key.toUpperCase()
    const result = objMapKeys(object, callback)
    expect(result).toEqual({})
  })

  it('should handle non-string keys', () => {
    const object = { 1: 'a', 2: 'b', 3: 'c' }
    const callback = (key: string, value: string) => key + key
    const result = objMapKeys(object, callback)
    expect(result).toEqual({ '11': 'a', '22': 'b', '33': 'c' })
  })
})
