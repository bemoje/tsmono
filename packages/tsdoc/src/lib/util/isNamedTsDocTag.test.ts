import { isNamedTsDocTag } from './isNamedTsDocTag'

describe('isNamedTsDocTag', () => {
  it('should return true for valid TSDoc tags', () => {
    expect(isNamedTsDocTag('param')).toBe(true)
    expect(isNamedTsDocTag('property')).toBe(true)
    expect(isNamedTsDocTag('typedef')).toBe(true)
    expect(isNamedTsDocTag('alias')).toBe(true)
    expect(isNamedTsDocTag('event')).toBe(true)
    expect(isNamedTsDocTag('function')).toBe(true)
    expect(isNamedTsDocTag('method')).toBe(true)
    expect(isNamedTsDocTag('namespace')).toBe(true)
    expect(isNamedTsDocTag('enum')).toBe(true)
    expect(isNamedTsDocTag('interface')).toBe(true)
    expect(isNamedTsDocTag('class')).toBe(true)
    expect(isNamedTsDocTag('type')).toBe(true)
    expect(isNamedTsDocTag('var')).toBe(true)
    expect(isNamedTsDocTag('module')).toBe(true)
  })

  it('should return true for valid TSDoc tags regardless of case', () => {
    expect(isNamedTsDocTag('Param')).toBe(true)
    expect(isNamedTsDocTag('PROPERTY')).toBe(true)
    expect(isNamedTsDocTag('Alias')).toBe(true)
    expect(isNamedTsDocTag('Namespace')).toBe(true)
    expect(isNamedTsDocTag('TYPEDEF')).toBe(true)
    expect(isNamedTsDocTag('MODULE')).toBe(true)
    expect(isNamedTsDocTag('Var')).toBe(true)
  })

  it('should return false for invalid TSDoc tags', () => {
    expect(isNamedTsDocTag('invalid')).toBe(false)
    expect(isNamedTsDocTag('notatag')).toBe(false)
    expect(isNamedTsDocTag('')).toBe(false)
  })
})
