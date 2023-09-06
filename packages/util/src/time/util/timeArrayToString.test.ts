import { timeArrayToString } from './timeArrayToString'

describe(timeArrayToString.name, () => {
  it('should convert an array of time values into a string representation', () => {
    expect(timeArrayToString([0, 0, 0, 0])).toBe('00:00:00.000')
    expect(timeArrayToString([1, 0, 30, 500])).toBe('01:00:30.500')
    expect(timeArrayToString([12, 34, 56, 789])).toBe('12:34:56.789')
    expect(timeArrayToString([23, 59, 59, 999])).toBe('23:59:59.999')
  })

  it('should throw an error if the array length is not 4', () => {
    expect(() => {
      timeArrayToString([])
    }).toThrow('Expected array of length 4.')
    expect(() => {
      timeArrayToString([1, 2, 3])
    }).toThrow('Expected array of length 4.')
    expect(() => {
      timeArrayToString([1, 2, 3, 4, 5])
    }).toThrow('Expected array of length 4.')
  })

  it('should throw an error if any of the time unit values are not valid', () => {
    expect(() => {
      timeArrayToString([-1, 0, 0, 0])
    }).toThrow('Expected hours to be between 0 and 23. Got: -1')
    expect(() => {
      timeArrayToString([0, 60, 0, 0])
    }).toThrow('Expected minutes to be between 0 and 59. Got: 60')
    expect(() => {
      timeArrayToString([0, 0, 60, 0])
    }).toThrow('Expected seconds to be between 0 and 59. Got: 60')
    expect(() => {
      timeArrayToString([0, 0, 0, -1])
    }).toThrow('Expected milliseconds to be between 0 and 999. Got: -1')
  })
})
