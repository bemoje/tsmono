import { trimArrayBytesRight } from './trimArrayBytesRight'

describe('trimArrayBytesRight', () => {
  it('should return the same array if the last byte is not 0', () => {
    const input = [1, 2, 3, 4]
    const output = trimArrayBytesRight(input)
    expect(output).toEqual(input)
  })

  it('should return an array without the last byte if it is 0', () => {
    const input = [1, 2, 3, 0]
    const output = trimArrayBytesRight(input)
    expect(output).toEqual([1, 2, 3])
  })

  it('should return an array without the last two bytes if they are 0', () => {
    const input = [1, 2, 0, 0]
    const output = trimArrayBytesRight(input)
    expect(output).toEqual([1, 2])
  })

  it('should return an array with only the first byte if all other bytes are 0', () => {
    const input = [1, 0, 0, 0]
    const output = trimArrayBytesRight(input)
    expect(output).toEqual([1])
  })

  it('should return the input array if the last three elements are not zero', () => {
    const input = [1, 2, 3, 4]
    const result = trimArrayBytesRight(input)
    expect(result).toEqual(input)
  })

  it('should return an array with only the first element if the last three elements are zero', () => {
    const input = [1, 0, 0, 0]
    const result = trimArrayBytesRight(input)
    expect(result).toEqual([1])
  })

  it('should return an array with the first two elements if the last two elements are zero', () => {
    const input = [1, 2, 0, 0]
    const result = trimArrayBytesRight(input)
    expect(result).toEqual([1, 2])
  })

  it('should return an array with the first three elements if the last element is zero', () => {
    const input = [1, 2, 3, 0]
    const result = trimArrayBytesRight(input)
    expect(result).toEqual([1, 2, 3])
  })
})
