import { invertComparator } from './invertComparator'

describe('invertComparator', () => {
  it('should invert the order of comparison of a sort-comparator function', () => {
    const numbers = [1, 2, 3, 4, 5]
    const comparator = (a: number, b: number) => a - b
    const invertedComparator = invertComparator(comparator)
    const sortedNumbers = numbers.sort(invertedComparator)
    expect(sortedNumbers).toEqual([5, 4, 3, 2, 1])
  })

  it('should return 0 when both elements are equal', () => {
    const comparator = (a: number, b: number) => a - b
    const invertedComparator = invertComparator(comparator)
    expect(invertedComparator(2, 2)).toEqual(0)
  })

  it('should return a positive number when the first argument is less than the second', () => {
    const comparator = (a: number, b: number) => a - b
    const invertedComparator = invertComparator(comparator)
    expect(invertedComparator(1, 2)).toBeGreaterThan(0)
  })

  it('should return a negative number when the first argument is greater than the second', () => {
    const comparator = (a: number, b: number) => a - b
    const invertedComparator = invertComparator(comparator)
    expect(invertedComparator(2, 1)).toBeLessThan(0)
  })
})
