import { pathIsUnc } from './pathIsUnc'

describe(pathIsUnc.name, function () {
  it('should return true for UNC paths', function () {
    expect(pathIsUnc('\\/foo/bar')).toBe(true)
    expect(pathIsUnc('\\\\foo/bar')).toBe(true)
    expect(pathIsUnc('\\\\foo\\admin$')).toBe(true)
    expect(pathIsUnc('\\\\foo\\admin$\\system32')).toBe(true)
    expect(pathIsUnc('\\\\foo\\temp')).toBe(true)
    expect(pathIsUnc('\\\\/foo/bar')).toBe(true)
    expect(pathIsUnc('\\\\\\/foo/bar')).toBe(true)
  })

  it('should return false for non-UNC paths', function () {
    expect(pathIsUnc('/foo/bar')).toBe(false)
    expect(pathIsUnc('/')).toBe(false)
    expect(pathIsUnc('/foo')).toBe(false)
    expect(pathIsUnc('/foo/')).toBe(false)
    expect(pathIsUnc('c:')).toBe(false)
    expect(pathIsUnc('c:.')).toBe(false)
    expect(pathIsUnc('c:./')).toBe(false)
    expect(pathIsUnc('c:./file')).toBe(false)
    expect(pathIsUnc('c:/')).toBe(false)
    expect(pathIsUnc('c:/file')).toBe(false)
  })

  it('should return true if the filepath is a UNC path', () => {
    expect(pathIsUnc('//server/share/dir/file.txt')).toBe(true)
  })

  it('should return false if the filepath is not a UNC path', () => {
    expect(pathIsUnc('')).toBe(false)
    expect(pathIsUnc('/')).toBe(false)
    expect(pathIsUnc('/dir/file.txt')).toBe(false)
    expect(pathIsUnc('C:/')).toBe(false)
    expect(pathIsUnc('C:/dir/file.txt')).toBe(false)
    expect(pathIsUnc('file.txt')).toBe(false)
    expect(pathIsUnc('dir/file.txt')).toBe(false)
  })
})
