import { tsDocNormalizeTagName } from './tsDocNormalizeTagName'

describe('tsDocNormalizeTagName', () => {
  it('should return the equivalent TypeScript keyword if found in the map', () => {
    expect(tsDocNormalizeTagName('virtual')).toBe('abstract')
    expect(tsDocNormalizeTagName('augments')).toBe('extends')
    expect(tsDocNormalizeTagName('constructor')).toBe('class')
    expect(tsDocNormalizeTagName('const')).toBe('constant')
    expect(tsDocNormalizeTagName('defaultvalue')).toBe('default')
    expect(tsDocNormalizeTagName('desc')).toBe('description')
    expect(tsDocNormalizeTagName('host')).toBe('external')
    expect(tsDocNormalizeTagName('fileoverview')).toBe('file')
    expect(tsDocNormalizeTagName('fires')).toBe('emits')
    expect(tsDocNormalizeTagName('func')).toBe('function')
    expect(tsDocNormalizeTagName('var')).toBe('member')
    expect(tsDocNormalizeTagName('arg')).toBe('param')
    expect(tsDocNormalizeTagName('prop')).toBe('property')
    expect(tsDocNormalizeTagName('return')).toBe('returns')
    expect(tsDocNormalizeTagName('exception')).toBe('throws')
    expect(tsDocNormalizeTagName('yield')).toBe('yields')
  })

  it('should return the input string if no equivalent TypeScript keyword is found', () => {
    expect(tsDocNormalizeTagName('unknown')).toBe('unknown')
  })

  it('should be case-insensitive', () => {
    expect(tsDocNormalizeTagName('VIRTUAL')).toBe('abstract')
    expect(tsDocNormalizeTagName('AuGmEnTs')).toBe('extends')
    expect(tsDocNormalizeTagName('CONSTRUCTOR')).toBe('class')
  })

  it('should handle empty string', () => {
    expect(tsDocNormalizeTagName('')).toBe('')
  })
})
