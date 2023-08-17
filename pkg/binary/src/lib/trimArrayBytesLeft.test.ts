import { trimArrayBytesLeft } from './trimArrayBytesLeft'

describe('trimArrayBytesLeft', () => {
  it('should return the same array if the first byte is not 0', () => {
    const input = [1, 2, 3, 4]
    const output = trimArrayBytesLeft(input)
    expect(output).toEqual(input)
  })

  it('should return an array with the first byte removed if the first byte is 0 and the second byte is not 0', () => {
    const input = [0, 1, 2, 3]
    const output = trimArrayBytesLeft(input)
    expect(output).toEqual([1, 2, 3])
  })

  it('should return an array with the first two bytes removed if the first two bytes are 0 and the third byte is not 0', () => {
    const input = [0, 0, 1, 2]
    const output = trimArrayBytesLeft(input)
    expect(output).toEqual([1, 2])
  })

  it('should return an array with the first three bytes removed if the first three bytes are 0', () => {
    const input = [0, 0, 0, 1]
    const output = trimArrayBytesLeft(input)
    expect(output).toEqual([1])
  })

  it('should return the input array if the first element is not zero', () => {
    const input = [1, 2, 3, 4]
    const result = trimArrayBytesLeft(input)
    expect(result).toEqual(input)
  })

  it('should return an array with the first element removed if the first element is zero', () => {
    const input = [0, 1, 2, 3]
    const result = trimArrayBytesLeft(input)
    expect(result).toEqual([1, 2, 3])
  })

  it('should return an array with the first two elements removed if the first two elements are zero', () => {
    const input = [0, 0, 1, 2]
    const result = trimArrayBytesLeft(input)
    expect(result).toEqual([1, 2])
  })

  it('should return an array with the first three elements removed if the first three elements are zero', () => {
    const input = [0, 0, 0, 1]
    const result = trimArrayBytesLeft(input)
    expect(result).toEqual([1])
  })

  it('should return an array with only the last element if all elements except the last one are zero', () => {
    const input = [0, 0, 0, 5]
    const result = trimArrayBytesLeft(input)
    expect(result).toEqual([5])
  })
})
