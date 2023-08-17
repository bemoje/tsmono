import { intToArrayBytes } from './intToArrayBytes'

describe('intToArrayBytes', () => {
  it('should return an array with one element if the input is less than 256', () => {
    expect(intToArrayBytes(100)).toEqual([100])
  })

  it('should return an array with two elements if the input is less than 65536', () => {
    expect(intToArrayBytes(50000)).toEqual([80, 195])
  })

  it('should return an array with three elements if the input is less than 16777216', () => {
    expect(intToArrayBytes(1000000)).toEqual([64, 66, 15])
  })

  it('should return an array with four elements if the input is less than 4294967296', () => {
    expect(intToArrayBytes(4000000000)).toEqual([0, 40, 107, 238])
  })

  it('should return an array with four elements if the input is greater than or equal to 4294967296', () => {
    expect(intToArrayBytes(4294967296)).toEqual([256, 256, 256, 256])
  })

  it('should return an array with the integer if it is less than 256', () => {
    expect(intToArrayBytes(0)).toEqual([0])
    expect(intToArrayBytes(255)).toEqual([255])
  })

  it('should return an array with [256, 256, 256, 256] if the integer is greater than or equal to 4294967296', () => {
    expect(intToArrayBytes(4294967296)).toEqual([256, 256, 256, 256])
    expect(intToArrayBytes(9999999999)).toEqual([256, 256, 256, 256])
  })
})
