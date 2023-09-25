import { pathIsAbsoluteWindows } from './pathIsAbsoluteWindows'

describe(pathIsAbsoluteWindows.name, () => {
  it('should pass all node native `path.win32.isAbsolute` tests:', function () {
    expect(pathIsAbsoluteWindows('//server/file')).toBe(true)
    expect(pathIsAbsoluteWindows('\\\\server\\file')).toBe(true)
    expect(pathIsAbsoluteWindows('C:/Users/')).toBe(true)
    expect(pathIsAbsoluteWindows('C:\\Users\\')).toBe(true)
    expect(pathIsAbsoluteWindows('C:cwd/another')).toBe(false)
    expect(pathIsAbsoluteWindows('C:cwd\\another')).toBe(false)
    expect(pathIsAbsoluteWindows('directory/directory')).toBe(false)
    expect(pathIsAbsoluteWindows('directory\\directory')).toBe(false)
  })

  it('should support windows', function () {
    expect(pathIsAbsoluteWindows('c:\\')).toBe(true)
    expect(pathIsAbsoluteWindows('//C://user\\docs\\Letter.txt')).toBe(true)
    expect(pathIsAbsoluteWindows('a:foo/a/b/c/d')).toBe(false)
    expect(pathIsAbsoluteWindows(':\\')).toBe(false)
    expect(pathIsAbsoluteWindows('foo\\bar\\baz')).toBe(false)
    expect(pathIsAbsoluteWindows('foo\\bar\\baz\\')).toBe(false)
    expect(pathIsAbsoluteWindows('\\\\unc\\share')).toBe(true)
    expect(pathIsAbsoluteWindows('\\\\unc\\share\\foo')).toBe(true)
    expect(pathIsAbsoluteWindows('\\\\unc\\share\\foo\\')).toBe(true)
    expect(pathIsAbsoluteWindows('\\\\unc\\share\\foo\\bar')).toBe(true)
    expect(pathIsAbsoluteWindows('\\\\unc\\share\\foo\\bar\\')).toBe(true)
    expect(pathIsAbsoluteWindows('\\\\unc\\share\\foo\\bar\\baz')).toBe(true)
  })

  it('should support windows unc', function () {
    expect(pathIsAbsoluteWindows('\\\\foo\\bar')).toBe(true)
    expect(pathIsAbsoluteWindows('//UNC//Server01//user//docs//Letter.txt')).toBe(true)
  })
})
