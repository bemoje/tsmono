import { arrSome } from './arrSome'

describe('arrSome', () => {
  it('example', () => {
    const arr = ['hello', 'world']
    expect(
      arrSome(arr, (element: any) => {
        return element.length > 5
      })
    ).toBe(false)
    expect(
      arrSome(arr, (element: any) => {
        return element.length === 5
      })
    ).toBe(true)
    expect(
      arrSome([], (element: any) => {
        return element.length === 5
      })
    ).toBe(false)
  })

  it('callback is passed all correct values', () => {
    const arr = [1, 2, 3, 4, 5]
    const indexCheck = new Array(arr.length)
    arrSome(arr, (element: any, i: number, array: Array<any>) => {
      expect(arr === array).toBe(true)
      expect(arr[i] === array[i]).toBe(true)
      expect(arr[i] === element).toBe(true)
      expect(Number.isInteger(i)).toBe(true)
      indexCheck[i] = arr[i]
      return false
    })
    expect(indexCheck).toStrictEqual(arr)
  })

  it('should return false if the array is empty', () => {
    const input: number[] = []
    const predicate = (num: number) => num > 0

    const result = arrSome(input, predicate)

    expect(result).toBe(false)
  })

  it('should return false if no element satisfies the predicate', () => {
    const input = [1, 2, 3, 4, 5]
    const predicate = (num: number) => num > 5

    const result = arrSome(input, predicate)

    expect(result).toBe(false)
  })

  it('should return true if at least one element satisfies the predicate', () => {
    const input = [1, 2, 3, 4, 5]
    const predicate = (num: number) => num > 3

    const result = arrSome(input, predicate)

    expect(result).toBe(true)
  })

  it('should pass the index and the array to the predicate function', () => {
    const input = [1, 2, 3, 4, 5]
    const predicate = jest.fn((num: number, index: number, arr: number[]) => false)

    const result = arrSome(input, predicate)

    expect(result).toBe(false)
    expect(predicate).toHaveBeenCalledTimes(5)
    expect(predicate).toHaveBeenCalledWith(1, 0, input)
    expect(predicate).toHaveBeenCalledWith(2, 1, input)
    expect(predicate).toHaveBeenCalledWith(3, 2, input)
    expect(predicate).toHaveBeenCalledWith(4, 3, input)
    expect(predicate).toHaveBeenCalledWith(5, 4, input)
  })
})
