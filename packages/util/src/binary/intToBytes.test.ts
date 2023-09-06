import { intToBytes } from './intToBytes'

describe('intToBytes', () => {
  it('throws when passed non-integer floating point number', () => {
    expect(() => intToBytes(1.1)).toThrowError(`input must be a positive integer. Got 1.1`)
  })
  it('throws when passed NaN', () => {
    expect(() => intToBytes(NaN)).toThrowError(`input must be a positive integer. Got NaN`)
  })
  it('throws when passed a negative value', () => {
    expect(() => intToBytes(-2)).toThrowError(`input must be a positive integer. Got -2`)
  })
  it('throws when passed an int larger than 256^5', () => {
    expect(() => intToBytes(256 ** 5 + 1)).toThrowError(
      `input must be less than or equal to 256^5. Got ${256 ** 5 + 1}`
    )
  })
  it('does not throw when passed an int of exactly 256^5', () => {
    expect(() => intToBytes(256 ** 5)).not.toThrowError()
  })
})
