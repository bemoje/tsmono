import { assertValidSeconds } from './assertValidSeconds'

describe(assertValidSeconds.name, () => {
  it('should not throw an error for valid second values', () => {
    expect(() => assertValidSeconds(0)).not.toThrow()
    expect(() => assertValidSeconds(59)).not.toThrow()
  })

  it('should throw an error for non-integer second values', () => {
    expect(() => assertValidSeconds(30.5)).toThrowError('Expected seconds to be between 0 and 59. Got: 30.5')
  })

  it('should throw an error for second values less than 0', () => {
    expect(() => assertValidSeconds(-1)).toThrowError('Expected seconds to be between 0 and 59. Got: -1')
  })

  it('should throw an error for second values greater than 59', () => {
    expect(() => assertValidSeconds(60)).toThrowError('Expected seconds to be between 0 and 59. Got: 60')
  })
})
