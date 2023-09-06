import { assertValidTimeInt } from './assertValidTimeInt'

describe(assertValidTimeInt.name, () => {
  it('should not throw error for valid time integer', () => {
    expect(() => assertValidTimeInt(0)).not.toThrowError()
    expect(() => assertValidTimeInt(86399999)).not.toThrowError()
  })

  it('should throw error for invalid time integer', () => {
    expect(() => assertValidTimeInt(-1)).toThrowError()
    expect(() => assertValidTimeInt(86399999.5)).toThrowError()
  })
})
