import { objEntriesArray } from './objEntriesArray'

describe('objEntriesArray', () => {
  it('should return an empty array when an empty object is passed', () => {
    const obj = {}
    const result = objEntriesArray(obj)
    expect(result).toEqual([])
  })

  it('should return an array of key-value pairs when a non-empty object is passed', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = objEntriesArray(obj)
    expect(result).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ])
  })
})
