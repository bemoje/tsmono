import { arrFindLast } from './arrFindLast'

describe(arrFindLast.name, () => {
  it('should return the last element that satisfies the predicate', () => {
    const arr = [1, 2, 3, 4, 5]
    const predicate = (value: number) => value < 4
    const result = arrFindLast(arr, predicate)
    expect(result).toBe(3)
  })

  it('should return undefined if no elements satisfy the predicate', () => {
    const arr = [1, 2, 3, 4, 5]
    const predicate = (value: number) => value > 5
    const result = arrFindLast(arr, predicate)
    expect(result).toBeUndefined()
  })

  it('should return undefined if the input array is empty', () => {
    const arr: number[] = []
    const predicate = (value: number) => value > 0
    const result = arrFindLast(arr, predicate)
    expect(result).toBeUndefined()
  })

  it('should return undefined if the input array is empty and predicate is not satisfied', () => {
    const arr: number[] = []
    const predicate = (value: number) => value < 0
    const result = arrFindLast(arr, predicate)
    expect(result).toBeUndefined()
  })
})
