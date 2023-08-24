import { isValidSeconds } from './isValidSeconds'

describe(isValidSeconds.name, () => {
  it('returns true for valid seconds', () => {
    expect(isValidSeconds(0)).toBe(true)
    expect(isValidSeconds(30)).toBe(true)
    expect(isValidSeconds(59)).toBe(true)
  })

  it('returns false for negative values', () => {
    expect(isValidSeconds(-1)).toBe(false)
    expect(isValidSeconds(-10)).toBe(false)
    expect(isValidSeconds(-59)).toBe(false)
  })

  it('returns false for values greater than 59', () => {
    expect(isValidSeconds(60)).toBe(false)
    expect(isValidSeconds(100)).toBe(false)
    expect(isValidSeconds(1000)).toBe(false)
  })

  it('returns false for non-integer values', () => {
    expect(isValidSeconds(0.5)).toBe(false)
    expect(isValidSeconds(10.2)).toBe(false)
    expect(isValidSeconds(59.9)).toBe(false)
  })
})
