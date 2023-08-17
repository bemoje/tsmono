import { padArrayBytesRight } from './padArrayBytesRight'

describe('padArrayBytesRight', () => {
  it('should pad an array of bytes on the right', () => {
    expect(padArrayBytesRight([1])).toEqual([1, 0, 0, 0])
    expect(padArrayBytesRight([1, 2])).toEqual([1, 2, 0, 0])
    expect(padArrayBytesRight([1, 2, 3])).toEqual([1, 2, 3, 0])
    expect(padArrayBytesRight([1, 2, 3, 4])).toEqual([1, 2, 3, 4])
  })

  it('should return the same array if it already has a length of 4', () => {
    const input = [1, 2, 3, 4]
    const result = padArrayBytesRight(input)
    expect(result).toEqual(input)
  })

  it('should pad an array of length 1 with three zeros', () => {
    const input = [1]
    const result = padArrayBytesRight(input)
    expect(result).toEqual([1, 0, 0, 0])
  })

  it('should pad an array of length 2 with two zeros', () => {
    const input = [1, 2]
    const result = padArrayBytesRight(input)
    expect(result).toEqual([1, 2, 0, 0])
  })

  it('should pad an array of length 3 with one zero', () => {
    const input = [1, 2, 3]
    const result = padArrayBytesRight(input)
    expect(result).toEqual([1, 2, 3, 0])
  })

  it('should return an all-zeros array if the input array is empty', () => {
    const input: number[] = []
    const result = padArrayBytesRight(input)
    expect(result).toEqual([0, 0, 0, 0])
  })
})
