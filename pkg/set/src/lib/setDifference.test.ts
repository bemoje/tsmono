import { setDifference } from './setDifference'

describe('setDifference', () => {
  it('should return a new set with elements that are in the first set but not in the second set', () => {
    const setA = new Set([1, 2, 3, 4])
    const setB = new Set([2, 4])
    const result = setDifference(setA, setB)
    expect(result).toEqual(new Set([1, 3]))
  })

  it('should return a new set that contains all elements of the first set that are not in the second set', () => {
    const setA = new Set([1, 2, 3, 4, 5])
    const setB = new Set([4, 5, 6, 7, 8])
    const result = setDifference(setA, setB)
    expect(result).toEqual(new Set([1, 2, 3]))
  })

  it('should return an empty set if the first set is a subset of the second set', () => {
    const setA = new Set([1, 2, 3])
    const setB = new Set([1, 2, 3, 4, 5])
    const result = setDifference(setA, setB)
    expect(result).toEqual(new Set())
  })

  it('should return the first set if there is no intersection with the second set', () => {
    const setA = new Set([1, 2, 3])
    const setB = new Set([4, 5, 6])
    const result = setDifference(setA, setB)
    expect(result).toEqual(setA)
  })

  it('should handle empty sets', () => {
    const setA = new Set()
    const setB = new Set([1, 2, 3])
    const result = setDifference(setA, setB)
    expect(result).toEqual(new Set())
  })

  it('should handle sets with different types of elements', () => {
    const setA = new Set([1, 'a', { foo: 'bar' }])
    const setB = new Set([1, 'b', { foo: 'baz' }])
    const result = setDifference(setA, setB)
    expect(result).toEqual(new Set(['a', { foo: 'bar' }]))
  })
})
