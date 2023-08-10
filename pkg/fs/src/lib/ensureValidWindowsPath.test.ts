import { ensureValidWindowsPath } from './ensureValidWindowsPath'

describe('ensureValidWindowsPath', () => {
  it('example', () => {
    ensureValidWindowsPath('C:\\Users\\John')
    // => true
  })
  it('accepts backslash', () => {
    expect(ensureValidWindowsPath('C:\\Users\\Benjamin\\Desktop')).toBe(true)
  })
  it('accepts forward slash', () => {
    expect(ensureValidWindowsPath('C:/Users/John/Desktop')).toBe(true)
  })
  it('rejects on both forward and backward slash in same path', () => {
    expect(ensureValidWindowsPath('C:/Users\\John')).toBe(false)
  })
  it('rejects when exceeding max length unless extendedMaxLength is enabled', () => {
    const longPath =
      'C:/Users/John/Desktop/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/index.js'
    expect(ensureValidWindowsPath(longPath)).toBe(false)
    expect(ensureValidWindowsPath(longPath, { extendedMaxLength: true })).toBe(true)
  })
  it('accepts network path', () => {
    expect(ensureValidWindowsPath('\\\\192.168.1.2')).toBe(true)
  })
  it('rejects on empty string', () => {
    expect(ensureValidWindowsPath('')).toBe(false)
  })
  it('rejects on illegal characters in windows file names', () => {
    expect(ensureValidWindowsPath('C:\\cool\\wow<wow.js')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\wow>wow.js')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\wow:wow.js')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\wow"wow.js')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\wow|wow.js')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\wow?wow.js')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\wow*wow.js')).toBe(false)
  })
  it('rejects on illegal windows filenames', () => {
    expect(ensureValidWindowsPath('C:\\cool\\CON')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\PRN')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\AUX')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\NUL')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\COM1')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\COM2')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\COM3')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\COM4')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\COM5')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\COM6')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\COM7')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\COM8')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\COM9')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\LPT1')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\LPT2')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\LPT3')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\LPT4')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\LPT5')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\LPT6')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\LPT7')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\LPT8')).toBe(false)
    expect(ensureValidWindowsPath('C:\\cool\\LPT9')).toBe(false)
  })
  it('accepts on illegal windows filename strings as part of filename', () => {
    expect(ensureValidWindowsPath('C:\\cool\\CON.txt')).toBe(true)
  })
  it('accets on illegal windows filename strings as part of directory name', () => {
    expect(ensureValidWindowsPath('C:\\CON4\\file.txt')).toBe(true)
  })
  it('rejects on illegal windows filename string as directory name', () => {
    expect(ensureValidWindowsPath('C:\\CON\\file.txt')).toBe(false)
  })
  it('rejects on invalid drive letter', () => {
    expect(ensureValidWindowsPath('CC:\\CON\\file.txt')).toBe(false)
  })
  it('throws on instead of returning false when enabled', () => {
    expect(() => ensureValidWindowsPath('', { assert: true })).toThrowError()
  })
})
