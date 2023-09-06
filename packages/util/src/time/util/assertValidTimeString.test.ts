import { assertValidTimeString } from './assertValidTimeString'

describe(assertValidTimeString.name, () => {
  it('should not throw an error for valid time strings', () => {
    expect(() => assertValidTimeString('00:00:00.000')).not.toThrow()
    expect(() => assertValidTimeString('23:59:59.000')).not.toThrow()
    expect(() => assertValidTimeString('12:01:30.000')).not.toThrow()
    expect(() => assertValidTimeString('08:15:45.000')).not.toThrow()
  })

  it('should throw an error for time strings with invalid hour', () => {
    expect(() => assertValidTimeString('24:00:00')).toThrow(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 24:00:00',
    )
    expect(() => assertValidTimeString('-1:00:00')).toThrow(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: -1:00:00',
    )
    expect(() => assertValidTimeString('100:00:00')).toThrow(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 100:00:00',
    )
    expect(() => assertValidTimeString('12:00:00.003')).not.toThrow()
  })

  it('should throw an error for time strings with invalid minute', () => {
    expect(() => assertValidTimeString('00:-1:00')).toThrow(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 00:-1:00',
    )
    expect(() => assertValidTimeString('00:60:00')).toThrow(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 00:60:00',
    )
    expect(() => assertValidTimeString('00:30:00.012')).not.toThrow()
  })

  it('should throw an error for time strings with invalid second', () => {
    expect(() => assertValidTimeString('00:00:-1')).toThrow(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 00:00:-1',
    )
    expect(() => assertValidTimeString('00:00:60')).toThrow(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 00:00:60',
    )
  })

  it('should throw an error for time strings with invalid millisecond', () => {
    expect(() => assertValidTimeString('00:00:00.1000')).toThrow(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 00:00:00.100',
    )
    expect(() => assertValidTimeString('00:00:00.-1')).toThrow(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 00:00:00.-1',
    )
    expect(() => assertValidTimeString('00:00:00.500')).not.toThrow()
  })

  it('should throw an error for time strings with missing parts', () => {
    expect(() => assertValidTimeString('00:00')).toThrow(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 00:00',
    )
    expect(() => assertValidTimeString('00:00:00:00')).toThrow(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 00:00:00:00',
    )
  })

  it('should throw an error for invalid time strings', () => {
    expect(() => assertValidTimeString('')).toThrow(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: ',
    )
    expect(() => assertValidTimeString('00:01:02:03:04')).toThrow(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 00:01:02:03:04',
    )
    expect(() => assertValidTimeString('12:34:56:78')).toThrow(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 12:34:56:78',
    )
    expect(() => assertValidTimeString('12:34:56.123.23')).toThrow(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 12:34:56.123.23',
    )
  })
})
