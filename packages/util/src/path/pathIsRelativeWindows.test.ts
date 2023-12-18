import { pathIsRelativeWindows } from './pathIsRelativeWindows'

describe(pathIsRelativeWindows.name, () => {
  it('should return true if the filepath is a relative path in Windows', () => {
    expect(pathIsRelativeWindows('file.txt')).toBe(true)
    expect(pathIsRelativeWindows('dir/file.txt')).toBe(true)
  })

  it('should return false if the filepath is not a relative path in Windows', () => {
    expect(pathIsRelativeWindows('C:/')).toBe(false)
    expect(pathIsRelativeWindows('C:/dir/file.txt')).toBe(false)
    expect(pathIsRelativeWindows('//server/share/dir/file.txt')).toBe(false)
  })
})
