import { regexIsValidFlags } from './regexIsValidFlags'

describe('regexIsValidFlags', () => {
  it('should return true for valid flags', () => {
    expect(regexIsValidFlags('g')).toBe(true)
    expect(regexIsValidFlags('i')).toBe(true)
    expect(regexIsValidFlags('m')).toBe(true)
    expect(regexIsValidFlags('s')).toBe(true)
    expect(regexIsValidFlags('u')).toBe(true)
    expect(regexIsValidFlags('y')).toBe(true)
    expect(regexIsValidFlags('gi')).toBe(true)
    expect(regexIsValidFlags('gim')).toBe(true)
    expect(regexIsValidFlags('gimsuy')).toBe(true)
    expect(regexIsValidFlags('gmisuy')).toBe(true)
  })

  it('should return false for invalid flags', () => {
    expect(regexIsValidFlags('a')).toBe(false)
    expect(regexIsValidFlags('gg')).toBe(false)
    expect(regexIsValidFlags('gmisuyy')).toBe(false)
  })
})
