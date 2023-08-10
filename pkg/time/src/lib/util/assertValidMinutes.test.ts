import { assertValidMinutes } from './assertValidMinutes'

describe(assertValidMinutes.name, () => {
  it('should throw an error if the number is less than 0', () => {
    expect(() => assertValidMinutes(-1)).toThrowError('Expected minutes to be between 0 and 59. Got: -1')
  })

  it('should throw an error if the number is greater than 59', () => {
    expect(() => assertValidMinutes(60)).toThrowError('Expected minutes to be between 0 and 59. Got: 60')
  })

  it('should throw an error if the number is not an integer', () => {
    expect(() => assertValidMinutes(0.5)).toThrowError('Expected minutes to be between 0 and 59. Got: 0.5')
  })

  it('should not throw an error if the number is between 0 and 59 (inclusive)', () => {
    expect(() => assertValidMinutes(0)).not.toThrowError()
    expect(() => assertValidMinutes(59)).not.toThrowError()
  })

  it('should throw an error if the number is between 0 and 59 (exclusive)', () => {
    expect(() => assertValidMinutes(-0.1)).toThrowError('Expected minutes to be between 0 and 59. Got: -0.1')
    expect(() => assertValidMinutes(59.1)).toThrowError('Expected minutes to be between 0 and 59. Got: 59.1')
  })
})
