import { arrFlatten } from './arrFlatten'

describe('arrFlatten', () => {
  it('flattens empty array', () => {
    expect(arrFlatten([])).toStrictEqual([])
  })

  it('flattens array depth 0', () => {
    expect(arrFlatten([1, 2])).toStrictEqual([1, 2])
  })

  it('flattens array depth 1', () => {
    expect(arrFlatten([1, [2]])).toStrictEqual([1, 2])
  })

  it('flattens array depth 2', () => {
    expect(arrFlatten([1, [2, [3]]])).toStrictEqual([1, 2, 3])
  })

  it('flattens array depth 3', () => {
    expect(arrFlatten([1, [2, [3, [4]]]])).toStrictEqual([1, 2, 3, 4])
  })

  it('flattens array depth 3 with max depth 0', () => {
    expect(arrFlatten([1, [2, [3, [4]]]], 0)).toStrictEqual([1, [2, [3, [4]]]])
  })

  it('flattens array depth 3 with max depth 1', () => {
    expect(arrFlatten([1, [2, [3, [4]]]], 1)).toStrictEqual([1, 2, [3, [4]]])
  })

  it('flattens array depth 3 with max depth 2', () => {
    expect(arrFlatten([1, [2, [3, [4]]]], 2)).toStrictEqual([1, 2, 3, [4]])
  })

  it('flattens complex array', () => {
    expect(arrFlatten([[[1, [[2, [3, [4]], 6]]]], 1, [2, [3, [4]], 6], 8, 2, [], 5, [9]])).toStrictEqual([
      1, 2, 3, 4, 6, 1, 2, 3, 4, 6, 8, 2, 5, 9,
    ])
  })

  it('should return an empty array if the input is an empty array', () => {
    const input: number[] = []
    const result = arrFlatten(input)
    expect(result).toEqual([])
  })

  it('should return the same array if the input is already flat', () => {
    const input = [1, 2, 3]
    const result = arrFlatten(input)
    expect(result).toEqual([1, 2, 3])
  })

  it('should flatten a nested array with depth 1', () => {
    const input = [1, [2, 3], 4]
    const result = arrFlatten(input, 1)
    expect(result).toEqual([1, 2, 3, 4])
  })

  it('should flatten a nested array with depth 2', () => {
    const input = [1, [2, [3, 4]], 5]
    const result = arrFlatten(input, 2)
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  it('should flatten a nested array with depth 3', () => {
    const input = [1, [2, [3, [4, 5]]], 6]
    const result = arrFlatten(input, 3)
    expect(result).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('should flatten a nested array with depth greater than the maximum depth', () => {
    const input = [1, [2, [3, [4, 5]]], 6]
    const result = arrFlatten(input, 2)
    expect(result).toEqual([1, 2, 3, [4, 5], 6])
  })
})
