import { isValidFileExtension } from './isValidFileExtension'

describe(isValidFileExtension.name, () => {
  it('should return true for valid file extensions', () => {
    expect(isValidFileExtension('.txt')).toBe(true)
    expect(isValidFileExtension('.jpg')).toBe(true)
    expect(isValidFileExtension('.pdf')).toBe(true)
    expect(isValidFileExtension('txt')).toBe(true)
    expect(isValidFileExtension('jpg')).toBe(true)
    expect(isValidFileExtension('pdf')).toBe(true)
  })

  it('should return false for empty file extension', () => {
    expect(isValidFileExtension('')).toBe(false)
  })

  it('should return false for a period', () => {
    expect(isValidFileExtension('.')).toBe(false)
  })

  it('should return false for invalid file extensions', () => {
    expect(isValidFileExtension('.a<a')).toBe(false)
    expect(isValidFileExtension('.a>a')).toBe(false)
    expect(isValidFileExtension('.a"a')).toBe(false)
    expect(isValidFileExtension('.a|a')).toBe(false)
    expect(isValidFileExtension('.a?a')).toBe(false)
    expect(isValidFileExtension('.a<a')).toBe(false)
    expect(isValidFileExtension('.a*a')).toBe(false)
    expect(isValidFileExtension('.a:a')).toBe(false)
  })
})
