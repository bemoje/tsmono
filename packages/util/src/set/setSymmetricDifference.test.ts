import { setSymmetricDifference } from './setSymmetricDifference'

describe('setSymmetricDifference', () => {
  it('returns the symmetric difference between two sets', () => {
    const setA = new Set([1, 2, 3])
    const setB = new Set([2, 3, 4])
    const result = setSymmetricDifference(setA, setB)
    expect(result).toEqual(new Set([1, 4]))
  })

  it('should return an empty set when both sets are empty', () => {
    const setA = new Set<number>()
    const setB = new Set<number>()
    const result = setSymmetricDifference(setA, setB)
    expect(result.size).toBe(0)
  })

  it('should return setA when setB is empty', () => {
    const setA = new Set<number>([1, 2, 3])
    const setB = new Set<number>()
    const result = setSymmetricDifference(setA, setB)
    expect(result).toEqual(setA)
  })

  it('should return setB when setA is empty', () => {
    const setA = new Set<number>()
    const setB = new Set<number>([4, 5, 6])
    const result = setSymmetricDifference(setA, setB)
    expect(result).toEqual(setB)
  })

  it('should return the symmetric difference of setA and setB', () => {
    const setA = new Set<number>([1, 2, 3, 4])
    const setB = new Set<number>([3, 4, 5, 6])
    const result = setSymmetricDifference(setA, setB)
    expect(result).toEqual(new Set<number>([1, 2, 5, 6]))
  })

  it('should not modify the original sets', () => {
    const setA = new Set<number>([1, 2, 3])
    const setB = new Set<number>([3, 4, 5])
    setSymmetricDifference(setA, setB)
    expect(setA).toEqual(new Set<number>([1, 2, 3]))
    expect(setB).toEqual(new Set<number>([3, 4, 5]))
  })
})
