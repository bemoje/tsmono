import { isNamedMultiTsDocTag } from './isNamedMultiTsDocTag'

describe('isNamedMultiTsDocTag', () => {
  it('should return true for "param"', () => {
    expect(isNamedMultiTsDocTag('param')).toBe(true)
  })

  it('should return false for anything else', () => {
    expect(isNamedMultiTsDocTag('property')).toBe(false)
    expect(isNamedMultiTsDocTag('')).toBe(false)
    expect(isNamedMultiTsDocTag('returns')).toBe(false)
  })
})
