import { objEntries } from './objEntries'

describe('objEntries', () => {
  it('should return an iterable of key-value pairs from the given object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const iterable = objEntries(obj)
    const result = Array.from(iterable)
    expect(result).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ])
  })

  it('should handle an empty object', () => {
    const obj = {}
    const iterable = objEntries(obj)
    const result = Array.from(iterable)
    expect(result).toEqual([])
  })
})
