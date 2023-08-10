import { assertValidTime } from './assertValidTime'

describe(assertValidTime.name, () => {
  it('should not throw an error for valid time values', () => {
    expect(() => assertValidTime(12, 30, 45, 500)).not.toThrow()
  })

  it('should throw an error for an invalid hour value', () => {
    expect(() => assertValidTime(24, 0, 0, 0)).toThrow('Expected hours to be between 0 and 23. Got: 24')
  })

  it('should throw an error for an invalid minute value', () => {
    expect(() => assertValidTime(12, 60, 0, 0)).toThrow('Expected minutes to be between 0 and 59. Got: 60')
  })

  it('should throw an error for an invalid second value', () => {
    expect(() => assertValidTime(12, 30, 60, 0)).toThrow('Expected seconds to be between 0 and 59. Got: 60')
  })

  it('should throw an error for an invalid millisecond value', () => {
    expect(() => assertValidTime(12, 30, 45, 1000)).toThrow('Expected milliseconds to be between 0 and 999. Got: 1000')
  })
})
