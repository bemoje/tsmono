import { timeArrayToStringUnsafe } from './timeArrayToStringUnsafe'

describe(timeArrayToStringUnsafe.name, () => {
  it('should return a correctly formatted string representation of the time', () => {
    expect(timeArrayToStringUnsafe([0, 0, 0, 0])).toBe('00:00:00.000')
    expect(timeArrayToStringUnsafe([1, 2, 3, 4])).toBe('01:02:03.004')
    expect(timeArrayToStringUnsafe([10, 30, 50, 100])).toBe('10:30:50.100')
  })

  it('should use the provided milliseconds delimiter correctly', () => {
    expect(timeArrayToStringUnsafe([0, 0, 0, 0], ',')).toBe('00:00:00,000')
    expect(timeArrayToStringUnsafe([1, 2, 3, 4], '')).toBe('01:02:03004')
    expect(timeArrayToStringUnsafe([10, 30, 50, 100], '-')).toBe('10:30:50-100')
  })

  it('should pad single digit values with leading zeros', () => {
    expect(timeArrayToStringUnsafe([9, 9, 9, 999])).toBe('09:09:09.999')
    expect(timeArrayToStringUnsafe([10, 20, 30, 40])).toBe('10:20:30.040')
    expect(timeArrayToStringUnsafe([0, 0, 0, 10])).toBe('00:00:00.010')
  })

  it('should throw an error if the array length is less than 4', () => {
    expect(() => {
      timeArrayToStringUnsafe([1, 2, 3])
    }).toThrow(Error)
  })
})
