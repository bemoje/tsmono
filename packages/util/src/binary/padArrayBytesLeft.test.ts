import { padArrayBytesLeft } from './padArrayBytesLeft'

describe('padArrayBytesLeft', () => {
  it('should pad an array of bytes on the left', () => {
    expect(padArrayBytesLeft([1])).toEqual([0, 0, 0, 1])
    expect(padArrayBytesLeft([1, 2])).toEqual([0, 0, 1, 2])
    expect(padArrayBytesLeft([1, 2, 3])).toEqual([0, 1, 2, 3])
    expect(padArrayBytesLeft([1, 2, 3, 4])).toEqual([1, 2, 3, 4])
  })

  it('should return the same array if it already has a length of 4', () => {
    const input = [1, 2, 3, 4]
    const result = padArrayBytesLeft(input)
    expect(result).toEqual(input)
  })

  it('should pad a single-byte array with three zeros on the left', () => {
    const input = [1]
    const result = padArrayBytesLeft(input)
    expect(result).toEqual([0, 0, 0, 1])
  })

  it('should pad a two-byte array with two zeros on the left', () => {
    const input = [1, 2]
    const result = padArrayBytesLeft(input)
    expect(result).toEqual([0, 0, 1, 2])
  })

  it('should pad a three-byte array with one zero on the left', () => {
    const input = [1, 2, 3]
    const result = padArrayBytesLeft(input)
    expect(result).toEqual([0, 1, 2, 3])
  })

  it('should return an all-zeroes array if the input array is empty', () => {
    const input: number[] = []
    const result = padArrayBytesLeft(input)
    expect(result).toEqual([0, 0, 0, 0])
  })
})
