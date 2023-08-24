import { arrEvery } from './arrEvery'

describe('arrEvery', () => {
  it('example', () => {
    const arr = [1, 2, 3, 4, 5]
    const isGreaterThanZero = (n: number) => n > 0
    const isGreaterThanThree = (n: number) => n > 3
    expect(arrEvery(arr, isGreaterThanZero)).toBe(true)
    expect(arrEvery(arr, isGreaterThanThree)).toBe(false)
  })

  it('callback is passed all correct values', () => {
    const arr = [1, 2, 3, 4, 5]
    const indexCheck = new Array(arr.length)
    arrEvery(arr, (element: any, i: number, array: Array<any>) => {
      expect(arr === array).toBe(true)
      expect(arr[i] === array[i]).toBe(true)
      expect(arr[i] === element).toBe(true)
      expect(Number.isInteger(i)).toBe(true)
      indexCheck[i] = arr[i]
      return true
    })
    expect(indexCheck).toStrictEqual(arr)
  })

  it('should return true if the predicate is satisfied for every element of the array', () => {
    const input = [1, 2, 3, 4, 5]
    const predicate = (num: number) => num > 0
    expect(arrEvery(input, predicate)).toBe(true)
  })

  it('should return false if the predicate is not satisfied for any element of the array', () => {
    const input = [1, 2, 3, 4, 5]
    const predicate = (num: number) => num > 3
    expect(arrEvery(input, predicate)).toBe(false)
  })

  it('should return true if the array is empty', () => {
    const input: number[] = []
    const predicate = (num: number) => num > 0
    expect(arrEvery(input, predicate)).toBe(true)
  })

  it('should return true if the array has only one element and the predicate is satisfied', () => {
    const input = [5]
    const predicate = (num: number) => num > 0
    expect(arrEvery(input, predicate)).toBe(true)
  })

  it('should return false if the array has only one element and the predicate is not satisfied', () => {
    const input = [5]
    const predicate = (num: number) => num > 10
    expect(arrEvery(input, predicate)).toBe(false)
  })

  it('should call the predicate with the correct arguments', () => {
    const input = [1, 2, 3]
    const predicate = jest.fn()
    arrEvery(input, predicate)
    expect(predicate).toHaveBeenCalledTimes(3)
    expect(predicate).toHaveBeenCalledWith(1, 0, input)
    expect(predicate).toHaveBeenCalledWith(2, 1, input)
    expect(predicate).toHaveBeenCalledWith(3, 2, input)
  })
})
