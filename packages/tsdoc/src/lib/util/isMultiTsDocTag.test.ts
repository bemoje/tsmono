import { isMultiTsDocTag } from './isMultiTsDocTag'

describe('isMultiTsDocTag', () => {
  it('should return true for valid multi TSDoc tags', () => {
    expect(isMultiTsDocTag('param')).toBe(true)
    expect(isMultiTsDocTag('template')).toBe(true)
    expect(isMultiTsDocTag('typeParam')).toBe(true)
    expect(isMultiTsDocTag('inheritDoc')).toBe(true)
    expect(isMultiTsDocTag('link')).toBe(true)
    expect(isMultiTsDocTag('see')).toBe(true)
    expect(isMultiTsDocTag('throws')).toBe(true)
    expect(isMultiTsDocTag('deprecated')).toBe(true)
  })

  it('should return false for invalid multi TSDoc tags', () => {
    expect(isMultiTsDocTag('invalid')).toBe(false)
    expect(isMultiTsDocTag('notatag')).toBe(false)
    expect(isMultiTsDocTag('')).toBe(false)
  })

  it('should be case-insensitive', () => {
    expect(isMultiTsDocTag('PARAM')).toBe(true)
    expect(isMultiTsDocTag('THROWS')).toBe(true)
  })
})
