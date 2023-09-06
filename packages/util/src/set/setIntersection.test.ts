import { setIntersection } from './setIntersection'

describe('setIntersection', () => {
  it('example', () => {
    expect(Array.from(setIntersection([new Set([1, 2, 3]), new Set([2, 3, 4])]))).toStrictEqual([2, 3])
  })

  it('handles many sets', () => {
    expect(Array.from(setIntersection([new Set([1, 2, 3]), new Set([2, 3, 4]), new Set([3, 4, 5])]))).toStrictEqual([3])
  })

  it('handles empty sets', () => {
    expect(Array.from(setIntersection([new Set([1, 2, 3]), new Set([])]))).toStrictEqual([])
    expect(Array.from(setIntersection([new Set([]), new Set([])]))).toStrictEqual([])
  })

  it('should return an empty set if the input array is empty', () => {
    const result = setIntersection([])
    expect(result.size).toBe(0)
  })

  it('should return the first set if the input array contains only one set', () => {
    const set = new Set([1, 2, 3])
    const result = setIntersection([set])
    expect(result).toEqual(set)
  })

  it('should return the intersection of multiple sets', () => {
    const set1 = new Set([1, 2, 3])
    const set2 = new Set([2, 3, 4])
    const set3 = new Set([3, 4, 5])
    const expected = new Set([3])
    const result = setIntersection([set1, set2, set3])
    expect(result).toEqual(expected)
  })

  it('should return an empty set if there is no intersection', () => {
    const set1 = new Set([1, 2, 3])
    const set2 = new Set([4, 5, 6])
    const set3 = new Set([7, 8, 9])
    const result = setIntersection([set1, set2, set3])
    expect(result.size).toBe(0)
  })

  it('should handle sets with duplicate values correctly', () => {
    const set1 = new Set([1, 2, 2, 3])
    const set2 = new Set([2, 2, 3, 4])
    const set3 = new Set([3, 4, 4, 5])
    const expected = new Set([3])
    const result = setIntersection([set1, set2, set3])
    expect(result).toEqual(expected)
  })
})
