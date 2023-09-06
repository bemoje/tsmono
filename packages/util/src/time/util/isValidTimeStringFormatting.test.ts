import { isValidTimeStringFormatting } from './isValidTimeStringFormatting'

describe(isValidTimeStringFormatting.name, () => {
  it('should return true for valid time string with comma separator', () => {
    expect(isValidTimeStringFormatting('12:34:56,789')).toBe(true)
  })

  it('should return true for valid time string with dot separator', () => {
    expect(isValidTimeStringFormatting('12:34:56.789')).toBe(true)
  })

  it('should return false for time string without milliseconds', () => {
    expect(isValidTimeStringFormatting('12:34:56')).toBe(false)
  })

  it('should return false for time string with incorrect format', () => {
    expect(isValidTimeStringFormatting('12:34:56:78')).toBe(false)
  })

  it('should return false for time string with milliseconds greater than 999', () => {
    expect(isValidTimeStringFormatting('12:34:56,1000')).toBe(false)
  })

  it('should return true for valid time string with zero milliseconds', () => {
    expect(isValidTimeStringFormatting('12:34:56,000')).toBe(true)
  })
})
