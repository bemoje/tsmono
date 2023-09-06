import { compare } from './compare'
import { compareArray } from './compareArray'

describe('compareArray', () => {
  it('example', () => {
    const arr = [
      [1, 2, 3],
      [1, 2, 2],
      [3, 0, 1],
      [0, 3, 1],
    ]
    const comparator = compareArray(compare)
    expect(arr.sort(comparator)).toStrictEqual([
      [0, 3, 1],
      [1, 2, 2],
      [1, 2, 3],
      [3, 0, 1],
    ])
  })
  it('identical rows are unchanged', () => {
    const arr = [
      [1, 2, 3],
      [1, 2, 3],
    ]
    const comparator = compareArray(compare)
    expect(arr.sort(comparator)).toStrictEqual([
      [1, 2, 3],
      [1, 2, 3],
    ])
  })

  it('deep recursive compare ascending', () => {
    const arr = [
      ['repo', 'src', ['compare', 'json']],
      ['repo', 'src', ['compare', 'ts']],
      ['repo', 'src', ['compare', 'js']],
    ]
    const comparator = compareArray(compare)
    expect(arr.sort(comparator)).toStrictEqual([
      ['repo', 'src', ['compare', 'js']],
      ['repo', 'src', ['compare', 'json']],
      ['repo', 'src', ['compare', 'ts']],
    ])
  })

  it('should return a function', () => {
    const result = compareArray(compare)
    expect(typeof result).toBe('function')
  })

  it('should sort an array of numbers in ascending order', () => {
    const arr = [[1, 2, 3], [1, 2], [1], [1, 2, 3, 4], [1, 2, 3, 4, 5], [5, 5]]
    const expected = [[1], [1, 2], [1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4, 5], [5, 5]]
    const result = arr.sort(compareArray(compare))
    expect(result).toEqual(expected)
  })

  it('should sort an array of strings in ascending order', () => {
    const arr = [['a', 'b', 'c'], ['a', 'b'], ['a'], ['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd', 'e']]
    const expected = [['a'], ['a', 'b'], ['a', 'b', 'c'], ['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd', 'e']]
    const result = arr.sort(compareArray(compare))
    expect(result).toEqual(expected)
  })

  it('should correctly compare arrays of different lengths', () => {
    const comparator = compareArray(compare)
    expect(
      [
        [1, 2, 3],
        [1, 2],
      ].sort(comparator),
    ).toEqual([
      [1, 2],
      [1, 2, 3],
    ])
    expect(
      [
        [1, 2],
        [1, 2, 3],
      ].sort(comparator),
    ).toEqual([
      [1, 2],
      [1, 2, 3],
    ])
  })

  it('should correctly compare arrays of arrays', () => {
    const comparator = compareArray(compare)
    expect(
      [
        [1, 2, 3],
        [1, 2],
        [1, 2, 3, 4],
      ].sort(comparator),
    ).toEqual([
      [1, 2],
      [1, 2, 3],
      [1, 2, 3, 4],
    ])
    expect(
      [
        [1, 2],
        [1, 2, 3, 4],
        [1, 2, 3],
      ].sort(comparator),
    ).toEqual([
      [1, 2],
      [1, 2, 3],
      [1, 2, 3, 4],
    ])
  })

  it('should correctly compare arrays and non-arrays', () => {
    expect([[1, 2, 3], 1].sort(compareArray(compare))).toEqual([[1, 2, 3], 1])
    expect([1, [1, 2, 3], 6, 2, [0, 0], [5, 6], [1, [2, [3]]]].sort(compareArray(compare))).toEqual([
      [0, 0],
      [1, [2, [3]]],
      [1, 2, 3],
      [5, 6],
      1,
      2,
      6,
    ])
  })
})
