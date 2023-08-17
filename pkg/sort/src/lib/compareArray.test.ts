import { compareArray } from './compareArray'
import { compareNumber } from './compareNumber'
import { compareNumberDescending } from './compareNumberDescending'
import { compareString } from './compareString'
import { compareStringDescending } from './compareStringDescending'

describe('compareArray', () => {
  it('example', () => {
    const arr = [
      [1, 2, 3],
      [1, 2, 2],
      [3, 0, 1],
      [0, 3, 1],
    ]
    const compare = compareArray(compareNumber)
    expect(arr.sort(compare)).toStrictEqual([
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
    const compare = compareArray(compareNumber)
    expect(arr.sort(compare)).toStrictEqual([
      [1, 2, 3],
      [1, 2, 3],
    ])
  })

  it('is compatible with descending sorting comparator', () => {
    const arr = [
      [1, 2, 3],
      [1, 2, 2],
      [3, 0, 1],
      [0, 3, 1],
    ]
    const compare = compareArray(compareNumberDescending, true)
    expect(arr.sort(compare)).toStrictEqual([
      [3, 0, 1],
      [1, 2, 3],
      [1, 2, 2],
      [0, 3, 1],
    ])
  })

  it('deep recursive compare ascending', () => {
    const arr = [
      ['repo', 'src', ['compare', 'json']],
      ['repo', 'src', ['compare', 'ts']],
      ['repo', 'src', ['compare', 'js']],
    ]
    const compare = compareArray(compareString)
    expect(arr.sort(compare)).toStrictEqual([
      ['repo', 'src', ['compare', 'js']],
      ['repo', 'src', ['compare', 'json']],
      ['repo', 'src', ['compare', 'ts']],
    ])
  })

  it('deep recursive compare descending', () => {
    const arr = [
      ['repo', 'src', ['compare', 'json']],
      ['repo', 'src', ['compare', 'ts']],
      ['repo', 'src', ['compare', 'js']],
    ]
    const compare = compareArray(compareStringDescending, true)
    expect(arr.sort(compare)).toStrictEqual([
      ['repo', 'src', ['compare', 'ts']],
      ['repo', 'src', ['compare', 'json']],
      ['repo', 'src', ['compare', 'js']],
    ])
  })

  it('should return a function', () => {
    const result = compareArray(compareNumber)
    expect(typeof result).toBe('function')
  })

  it('should sort an array of numbers in ascending order', () => {
    const arr = [[1, 2, 3], [1, 2], [1], [1, 2, 3, 4], [1, 2, 3, 4, 5]]
    const expected = [[1], [1, 2], [1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4, 5]]
    const result = arr.sort(compareArray(compareNumber))
    expect(result).toEqual(expected)
  })

  it('should sort an array of numbers in descending order', () => {
    const arr = [[1, 2, 3], [1, 2], [1], [1, 2, 3, 4], [1, 2, 3, 4, 5]]
    const expected = [[1, 2, 3, 4, 5], [1, 2, 3, 4], [1, 2, 3], [1, 2], [1]]
    const result = arr.sort(compareArray(compareNumber, true))
    expect(result).toEqual(expected)
  })

  it('should sort an array of strings in ascending order', () => {
    const arr = [['a', 'b', 'c'], ['a', 'b'], ['a'], ['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd', 'e']]
    const expected = [['a'], ['a', 'b'], ['a', 'b', 'c'], ['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd', 'e']]
    const result = arr.sort(compareArray(compareString))
    expect(result).toEqual(expected)
  })

  it('should sort an array of strings in descending order', () => {
    const arr = [['a', 'b', 'c'], ['a', 'b'], ['a'], ['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd', 'e']]
    const expected = [['a', 'b', 'c', 'd', 'e'], ['a', 'b', 'c', 'd'], ['a', 'b', 'c'], ['a', 'b'], ['a']]
    const result = arr.sort(compareArray(compareString, true))
    expect(result).toEqual(expected)
  })

  it('should correctly compare arrays of different lengths', () => {
    const compare = compareArray(compareNumber)
    expect(
      [
        [1, 2, 3],
        [1, 2],
      ].sort(compare),
    ).toEqual([
      [1, 2],
      [1, 2, 3],
    ])
    expect(
      [
        [1, 2],
        [1, 2, 3],
      ].sort(compare),
    ).toEqual([
      [1, 2],
      [1, 2, 3],
    ])
  })

  it('should correctly compare arrays of arrays', () => {
    const compare = compareArray(compareNumber)
    expect(
      [
        [1, 2, 3],
        [1, 2],
        [1, 2, 3, 4],
      ].sort(compare),
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
      ].sort(compare),
    ).toEqual([
      [1, 2],
      [1, 2, 3],
      [1, 2, 3, 4],
    ])
  })

  it('should correctly compare arrays and non-arrays', () => {
    const compare = compareArray(compareNumber)
    expect([[1, 2, 3], 1].sort(compare)).toEqual([1, [1, 2, 3]])
    expect([1, [1, 2, 3]].sort(compare)).toEqual([1, [1, 2, 3]])
  })
})
