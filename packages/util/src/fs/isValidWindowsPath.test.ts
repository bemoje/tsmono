import { isValidWindowsPath } from './isValidWindowsPath'

describe(isValidWindowsPath.name, () => {
  it('example', () => {
    isValidWindowsPath('C:\\Users\\John')
    // => true
  })
  it('accepts backslash', () => {
    expect(isValidWindowsPath('C:\\Users\\Benjamin\\Desktop')).toBe(true)
  })
  it('accepts forward slash', () => {
    expect(isValidWindowsPath('C:/Users/John/Desktop')).toBe(true)
  })
  it('rejects on both forward and backward slash in same path', () => {
    expect(isValidWindowsPath('C:/Users\\John')).toBe(false)
  })
  it('rejects when exceeding max length unless extendedMaxLength is enabled', () => {
    const longPath =
      'C:/Users/John/Desktop/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/index.js'
    expect(isValidWindowsPath(longPath)).toBe(false)
    expect(isValidWindowsPath(longPath, { extendedMaxLength: true })).toBe(true)
  })
  it('accepts network path', () => {
    expect(isValidWindowsPath('\\\\192.168.1.2')).toBe(true)
  })
  it('rejects on empty string', () => {
    expect(isValidWindowsPath('')).toBe(false)
  })
  it('rejects on illegal characters in windows file names', () => {
    expect(isValidWindowsPath('C:\\cool\\wow<wow.js')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\wow>wow.js')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\wow:wow.js')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\wow"wow.js')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\wow|wow.js')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\wow?wow.js')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\wow*wow.js')).toBe(false)
  })
  it('rejects on illegal windows filenames', () => {
    expect(isValidWindowsPath('C:\\cool\\CON')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\PRN')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\AUX')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\NUL')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\COM1')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\COM2')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\COM3')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\COM4')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\COM5')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\COM6')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\COM7')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\COM8')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\COM9')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\LPT1')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\LPT2')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\LPT3')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\LPT4')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\LPT5')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\LPT6')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\LPT7')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\LPT8')).toBe(false)
    expect(isValidWindowsPath('C:\\cool\\LPT9')).toBe(false)
  })
  it('accepts on illegal windows filename strings as part of filename', () => {
    expect(isValidWindowsPath('C:\\cool\\CON.txt')).toBe(true)
  })
  it('accets on illegal windows filename strings as part of directory name', () => {
    expect(isValidWindowsPath('C:\\CON4\\file.txt')).toBe(true)
  })
  it('rejects on illegal windows filename string as directory name', () => {
    expect(isValidWindowsPath('C:\\CON\\file.txt')).toBe(false)
  })
  it('rejects on invalid drive letter', () => {
    expect(isValidWindowsPath('CC:\\CON\\file.txt')).toBe(false)
  })
})
