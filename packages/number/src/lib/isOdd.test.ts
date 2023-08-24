import { isOdd } from './isOdd'

describe('isOdd', () => {
  it('correctly determines if natural number is even', () => {
    expect(isOdd(-22)).toBe(false)
    expect(isOdd(-21)).toBe(true)
    expect(isOdd(-2)).toBe(false)
    expect(isOdd(-1)).toBe(true)
    expect(isOdd(0)).toBe(false)
    expect(isOdd(1)).toBe(true)
    expect(isOdd(2)).toBe(false)
    expect(isOdd(21)).toBe(true)
    expect(isOdd(22)).toBe(false)
  })
  it('throws on invalid input.', () => {
    expect(() => isOdd(2.1)).toThrow()
  })
})
