import { intRangeMin } from './intRangeMin'

describe(intRangeMin.name, () => {
  it('should return 0 for unsigned integers', () => {
    expect(intRangeMin('unsigned', 8)).toBe(0)
    expect(intRangeMin('unsigned', 16)).toBe(0)
    expect(intRangeMin('unsigned', 32)).toBe(0)
  })

  it('should return the minimum value for signed integers', () => {
    expect(intRangeMin('signed', 8)).toBe(-128)
    expect(intRangeMin('signed', 16)).toBe(-32768)
    expect(intRangeMin('signed', 32)).toBe(-2147483648)
  })

  it('should throw an error if bits is not a positive integer', () => {
    expect(() => intRangeMin('unsigned', -8)).toThrow()
    expect(() => intRangeMin('unsigned', 1.5)).toThrow()
    expect(() => intRangeMin('unsigned', NaN)).toThrow()
    expect(() => intRangeMin('unsigned', Infinity)).toThrow()
  })
})
