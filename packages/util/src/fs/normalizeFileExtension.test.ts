import { normalizeFileExtension } from './normalizeFileExtension'

describe('normalizeFileExtension', () => {
  it('example', () => {
    expect(normalizeFileExtension('.js')).toBe('.js')
    expect(normalizeFileExtension('js')).toBe('.js')
    expect(normalizeFileExtension('test.js')).toBe('.js')
    expect(normalizeFileExtension('.test.js')).toBe('.js')
    expect(normalizeFileExtension('.test.js')).toBe('.js')
    expect(normalizeFileExtension('..js')).toBe('.js')
    expect(normalizeFileExtension('')).toBe('')
    expect(normalizeFileExtension('.')).toBe('')
    expect(() => normalizeFileExtension('.>s')).toThrowError()
  })
})
