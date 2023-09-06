import { isEven } from './isEven'

describe('isEven', () => {
  it('correctly determines if natural number is even', () => {
    expect(isEven(-22)).toBe(true)
    expect(isEven(-21)).toBe(false)
    expect(isEven(-2)).toBe(true)
    expect(isEven(-1)).toBe(false)
    expect(isEven(0)).toBe(true)
    expect(isEven(1)).toBe(false)
    expect(isEven(2)).toBe(true)
    expect(isEven(21)).toBe(false)
    expect(isEven(22)).toBe(true)
  })
  it('throws on invalid input.', () => {
    expect(() => isEven(2.1)).toThrow()
  })
})
