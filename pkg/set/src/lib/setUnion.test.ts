import { arrSortNumeric } from '@bemoje/array'
import { setUnion } from './setUnion'

describe('setUnion', () => {
  it('example', () => {
    expect(Array.from(setUnion([new Set([1, 2, 3]), new Set([2, 3, 4])]))).toStrictEqual(arrSortNumeric([1, 2, 3, 4]))
  })

  it('handles many sets', () => {
    expect(Array.from(setUnion([new Set([1, 2, 3]), new Set([2, 3, 4]), new Set([3, 4, 5])]))).toStrictEqual(
      arrSortNumeric([1, 2, 3, 4, 5]),
    )
  })

  it('handles empty sets', () => {
    expect(Array.from(setUnion([new Set([1, 2, 3]), new Set([])]))).toStrictEqual(arrSortNumeric([1, 2, 3]))
    expect(Array.from(setUnion([new Set([]), new Set([])]))).toStrictEqual([])
  })

  it('should return an empty set if the input array is empty', () => {
    const result = setUnion([])
    expect(result.size).toBe(0)
  })

  it('should return the same set if the input array contains only one set', () => {
    const set = new Set([1, 2, 3])
    const result = setUnion([set])
    expect(result).toEqual(set)
  })

  it('should return the union of multiple sets', () => {
    const set1 = new Set([1, 2, 3])
    const set2 = new Set([2, 3, 4])
    const set3 = new Set([3, 4, 5])
    const expected = new Set([1, 2, 3, 4, 5])
    const result = setUnion([set1, set2, set3])
    expect(result).toEqual(expected)
  })

  it('should handle empty sets correctly', () => {
    const set1 = new Set([1, 2, 3])
    const set2 = new Set([])
    const set3 = new Set([3, 4, 5])
    const expected = new Set([1, 2, 3, 4, 5])
    const result = setUnion([set1, set2, set3])
    expect(result).toEqual(expected)
  })
})
