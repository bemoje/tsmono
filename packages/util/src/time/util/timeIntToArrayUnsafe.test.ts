import { timeIntToArrayUnsafe } from './timeIntToArrayUnsafe'

describe(timeIntToArrayUnsafe.name, () => {
  it('should return the correct array for a given time in milliseconds', () => {
    const result = timeIntToArrayUnsafe(3723400)
    expect(result).toEqual([1, 2, 3, 400])
  })

  it('should handle zero milliseconds', () => {
    const result = timeIntToArrayUnsafe(0)
    expect(result).toEqual([0, 0, 0, 0])
  })

  it('should handle time with zero hours', () => {
    const result = timeIntToArrayUnsafe(60000)
    expect(result).toEqual([0, 1, 0, 0])
  })

  it('should handle time with zero minutes and zero hours', () => {
    const result = timeIntToArrayUnsafe(1000)
    expect(result).toEqual([0, 0, 1, 0])
  })

  it('should handle time with zero seconds, zero minutes, and zero hours', () => {
    const result = timeIntToArrayUnsafe(300)
    expect(result).toEqual([0, 0, 0, 300])
  })

  it('should handle negative time', () => {
    const result = timeIntToArrayUnsafe(-5000)
    expect(result).toEqual([-1, -1, -5, -0])
  })

  it('should handle large time', () => {
    const result = timeIntToArrayUnsafe(9999999999)
    expect(result).toEqual([2777, 46, 39, 999])
  })
})
