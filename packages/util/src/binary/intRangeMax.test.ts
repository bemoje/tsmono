import { intRangeMax } from './intRangeMax'

describe(intRangeMax.name, () => {
  it('should return the maximum value for unsigned integers', () => {
    expect(intRangeMax('unsigned', 8)).toBe(255)
    expect(intRangeMax('unsigned', 16)).toBe(65535)
    expect(intRangeMax('unsigned', 32)).toBe(4294967295)
  })

  it('should return the maximum value for signed integers', () => {
    expect(intRangeMax('signed', 8)).toBe(127)
    expect(intRangeMax('signed', 16)).toBe(32767)
    expect(intRangeMax('signed', 32)).toBe(2147483647)
  })

  it('should throw an error if bits is not a positive integer', () => {
    expect(() => intRangeMax('unsigned', -8)).toThrow()
    expect(() => intRangeMax('unsigned', 1.5)).toThrow()
    expect(() => intRangeMax('unsigned', NaN)).toThrow()
    expect(() => intRangeMax('unsigned', Infinity)).toThrow()
  })
})
