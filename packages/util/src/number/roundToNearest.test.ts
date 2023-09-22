import { roundToNearest } from './roundToNearest'

describe('roundToNearest', () => {
  it('should round to the nearest specified number', () => {
    expect(roundToNearest(5, 2)).toBe(6)
    expect(roundToNearest(5, 3)).toBe(6)
    expect(roundToNearest(0, 2)).toBe(0)
    expect(roundToNearest(-5, 2)).toBe(-4)
    expect(roundToNearest(-5, 3)).toBe(-6)
  })

  it('should throw an error if the first argument is not an integer', () => {
    expect(() => roundToNearest(NaN)).toThrow()
    expect(() => roundToNearest(Infinity)).toThrow()
    expect(() => roundToNearest(-Infinity)).toThrow()
    expect(() => roundToNearest(-Infinity)).toThrow()
    expect(() => roundToNearest(5.5)).toThrow()
  })

  it('should throw an error if the second argument is not an integer', () => {
    expect(() => roundToNearest(5, NaN)).toThrow()
    expect(() => roundToNearest(5, Infinity)).toThrow()
    expect(() => roundToNearest(5, -Infinity)).toThrow()
    expect(() => roundToNearest(5, 5.5)).toThrow()
  })
})
