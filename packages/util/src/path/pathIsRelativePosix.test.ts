import { pathIsRelativePosix } from './pathIsRelativePosix'

describe(pathIsRelativePosix.name, () => {
  it('should return true if the filepath is a relative path in POSIX', () => {
    expect(pathIsRelativePosix('file.txt')).toBe(true)
    expect(pathIsRelativePosix('dir/file.txt')).toBe(true)
  })

  it('should return false if the filepath is not a relative path in POSIX', () => {
    expect(pathIsRelativePosix('/')).toBe(false)
    expect(pathIsRelativePosix('/dir/file.txt')).toBe(false)
  })
})
