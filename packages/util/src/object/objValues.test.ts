import { objValues } from './objValues'

describe('objValues', () => {
  it('should return an iterable of the values of the given object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const iterable = objValues(obj)
    const result = Array.from(iterable)
    expect(result).toEqual([1, 2, 3])
  })

  it('should return an empty iterable for an empty object', () => {
    const obj = {}
    const iterable = objValues(obj)
    const result = Array.from(iterable)
    expect(result).toEqual([])
  })
})
