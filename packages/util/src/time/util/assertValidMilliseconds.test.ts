import { assertValidMilliseconds } from './assertValidMilliseconds'

describe(assertValidMilliseconds.name, () => {
  it('should not throw an error if the provided number is a valid millisecond value', () => {
    expect(() => assertValidMilliseconds(0)).not.toThrowError()
    expect(() => assertValidMilliseconds(500)).not.toThrowError()
    expect(() => assertValidMilliseconds(999)).not.toThrowError()
  })

  it('should throw an error if the provided number is less than 0', () => {
    expect(() => assertValidMilliseconds(-1)).toThrowError('Expected milliseconds to be between 0 and 999. Got: -1')
    expect(() => assertValidMilliseconds(-100)).toThrowError('Expected milliseconds to be between 0 and 999. Got: -100')
  })

  it('should throw an error if the provided number is greater than 999', () => {
    expect(() => assertValidMilliseconds(1000)).toThrowError('Expected milliseconds to be between 0 and 999. Got: 1000')
    expect(() => assertValidMilliseconds(2000)).toThrowError('Expected milliseconds to be between 0 and 999. Got: 2000')
  })

  it('should throw an error if the provided number is not an integer', () => {
    expect(() => assertValidMilliseconds(0.5)).toThrowError('Expected milliseconds to be between 0 and 999. Got: 0.5')
    expect(() => assertValidMilliseconds(10.99)).toThrowError(
      'Expected milliseconds to be between 0 and 999. Got: 10.99',
    )
  })
})
