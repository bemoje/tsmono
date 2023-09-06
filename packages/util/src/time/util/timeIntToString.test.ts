import { timeIntToString } from './timeIntToString'

describe(timeIntToString.name, () => {
  it('should convert a time integer to a string with default delimiter', () => {
    expect(timeIntToString(0)).toBe('00:00:00.000')
    expect(timeIntToString(1000)).toBe('00:00:01.000')
    expect(timeIntToString(10000)).toBe('00:00:10.000')
    expect(timeIntToString(60000)).toBe('00:01:00.000')
    expect(timeIntToString(3600000)).toBe('01:00:00.000')
    expect(timeIntToString(86399999)).toBe('23:59:59.999')
  })

  it('should convert a time integer to a string with custom delimiter', () => {
    expect(timeIntToString(0, '-')).toBe('00:00:00-000')
    expect(timeIntToString(1000, '-')).toBe('00:00:01-000')
    expect(timeIntToString(10000, '-')).toBe('00:00:10-000')
    expect(timeIntToString(60000, '-')).toBe('00:01:00-000')
    expect(timeIntToString(3600000, '-')).toBe('01:00:00-000')
    expect(timeIntToString(86399999, '-')).toBe('23:59:59-999')
  })

  it('should throw an error for invalid time integers', () => {
    expect(() => timeIntToString(-1)).toThrowError('Expected time int to be between 0 and 86399999. Got: -1')
    expect(() => timeIntToString(86400000)).toThrowError(
      'Expected time int to be between 0 and 86399999. Got: 86400000',
    )
    expect(() => timeIntToString(100.5)).toThrowError('Expected time int to be between 0 and 86399999. Got: 100.5')
  })
})
