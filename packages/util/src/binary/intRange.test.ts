import { intRange } from './intRange'

describe(intRange.name, () => {
  it('should return the range for unsigned integers', () => {
    expect(intRange('unsigned', 8)).toEqual([0, 255])
    expect(intRange('unsigned', 16)).toEqual([0, 65535])
    expect(intRange('unsigned', 32)).toEqual([0, 4294967295])
  })

  it('should return the range for signed integers', () => {
    expect(intRange('signed', 8)).toEqual([-128, 127])
    expect(intRange('signed', 16)).toEqual([-32768, 32767])
    expect(intRange('signed', 32)).toEqual([-2147483648, 2147483647])
  })

  it('should throw an error if bits is not a positive integer', () => {
    expect(() => intRange('unsigned', -8)).toThrow()
    expect(() => intRange('unsigned', 1.5)).toThrow()
    expect(() => intRange('unsigned', NaN)).toThrow()
    expect(() => intRange('unsigned', Infinity)).toThrow()
  })
})
