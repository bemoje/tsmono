import { assertValidTimeStringFormatting } from './assertValidTimeStringFormatting'

describe(assertValidTimeStringFormatting.name, () => {
  it('should not throw an error for valid time string format using comma delimiter', () => {
    expect(() => assertValidTimeStringFormatting('12:34:56,789')).not.toThrow()
  })

  it('should not throw an error for valid time string format using dot delimiter', () => {
    expect(() => assertValidTimeStringFormatting('12:34:56.789')).not.toThrow()
  })

  it('should throw an error for invalid time string format', () => {
    expect(() => assertValidTimeStringFormatting('12:34:56789')).toThrowError(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 12:34:56789',
    )
  })

  it('should throw an error for invalid time string format with missing seconds', () => {
    expect(() => assertValidTimeStringFormatting('12:34')).toThrowError(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 12:34',
    )
  })

  it('should throw an error for invalid time string format with missing minutes', () => {
    expect(() => assertValidTimeStringFormatting('12:')).toThrowError(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 12:',
    )
  })

  it('should throw an error for invalid time string format with missing hours', () => {
    expect(() => assertValidTimeStringFormatting(':34:56,789')).toThrowError(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: :34:56,789',
    )
  })

  it('should throw an error for invalid time string format with missing milliseconds', () => {
    expect(() => assertValidTimeStringFormatting('12:34:56')).toThrowError(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 12:34:56',
    )
  })

  it('should throw an error for invalid time string format with wrong delimiter', () => {
    expect(() => assertValidTimeStringFormatting('12:34:56789')).toThrowError(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 12:34:56789',
    )
  })

  it('should throw an error for invalid time string format with missing delimiter', () => {
    expect(() => assertValidTimeStringFormatting('12:34:56789')).toThrowError(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 12:34:56789',
    )
  })

  it('should throw an error for invalid time string format with more than 3 millisecond digits', () => {
    expect(() => assertValidTimeStringFormatting('12:34:56,7891')).toThrowError(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 12:34:56,7891',
    )
  })

  it('should throw an error for invalid time string format with negative hours', () => {
    expect(() => assertValidTimeStringFormatting('-12:34:56,789')).toThrowError(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: -12:34:56,789',
    )
  })

  it('should throw an error for invalid time string format with negative minutes', () => {
    expect(() => assertValidTimeStringFormatting('12:-34:56,789')).toThrowError(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 12:-34:56,789',
    )
  })

  it('should throw an error for invalid time string format with negative seconds', () => {
    expect(() => assertValidTimeStringFormatting('12:34:-56,789')).toThrowError(
      'Expected timestring to be of format hh:mm:ss:mmm with any desired delimiters. Got: 12:34:-56,789',
    )
  })
})
