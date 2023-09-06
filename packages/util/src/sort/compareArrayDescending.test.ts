import { compare } from './compare'
import { compareArrayDescending } from './compareArrayDescending'

describe('compareArray', () => {
  it('is compatible with descending sorting comparator', () => {
    const arr = [
      [1, 2, 3],
      [1, 2, 2],
      [3, 0, 1],
      [0, 3, 1],
    ]
    const comparator = compareArrayDescending(compare)
    expect(arr.sort(comparator)).toStrictEqual([
      [3, 0, 1],
      [1, 2, 3],
      [1, 2, 2],
      [0, 3, 1],
    ])
  })

  it('deep recursive compare descending', () => {
    const arr = [
      ['repo', 'src', ['compare', 'json']],
      ['repo', 'src', ['compare', 'ts']],
      ['repo', 'src', ['compare', 'js']],
    ]
    const comparator = compareArrayDescending(compare)
    expect(arr.sort(comparator)).toStrictEqual([
      ['repo', 'src', ['compare', 'ts']],
      ['repo', 'src', ['compare', 'json']],
      ['repo', 'src', ['compare', 'js']],
    ])
  })

  it('should sort an array of numbers in descending order', () => {
    const arr = [[1, 2, 3], [1, 2], [1], [1, 2, 3, 4], [1, 2, 3, 4, 5]]
    const expected = [[1, 2, 3, 4, 5], [1, 2, 3, 4], [1, 2, 3], [1, 2], [1]]
    const result = arr.sort(compareArrayDescending(compare))
    expect(result).toEqual(expected)
  })

  it('should sort an array of strings in descending order', () => {
    const arr = [['a', 'b', 'c'], ['a', 'b'], ['a'], ['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd', 'e']]
    const expected = [['a', 'b', 'c', 'd', 'e'], ['a', 'b', 'c', 'd'], ['a', 'b', 'c'], ['a', 'b'], ['a']]
    const result = arr.sort(compareArrayDescending(compare))
    expect(result).toEqual(expected)
  })

  it('should correctly compare arrays and non-arrays', () => {
    expect([1, [1, 2, 3], 6, 2, [0, 0], [5, 6], [1, [2, [3]]]].sort(compareArrayDescending(compare))).toEqual([
      6,
      2,
      1,
      [5, 6],
      [1, 2, 3],
      [1, [2, [3]]],
      [0, 0],
    ])
  })
})
