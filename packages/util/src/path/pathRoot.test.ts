import { pathRoot } from './pathRoot'

describe(pathRoot.name, () => {
  it('should return the root directory of a file path', function () {
    expect(pathRoot('\\\\server\\share\\abc')).toBe('\\\\server\\share\\')
    expect(pathRoot('\\\\server foo\\some folder\\base-file.js')).toBe('\\\\server foo\\some folder\\')
    expect(pathRoot('\\\\?\\UNC\\server\\share')).toBe('\\\\?\\UNC\\')
    expect(pathRoot('foo/bar/baz.js')).toBe('')
    expect(pathRoot('c:\\foo\\bar\\baz.js')).toBe('c:\\')
    expect(pathRoot('\\\\slslslsl\\admin$\\system32')).toBe('\\\\slslslsl\\admin$\\')
    expect(pathRoot('/foo/bar/baz.js')).toBe('/')
  })

  it('should return an empty string if no match is found', () => {
    expect(pathRoot('')).toBe('')
    expect(pathRoot('file.txt')).toBe('')
    expect(pathRoot('dir/file.txt')).toBe('')
  })

  it('should return the root of the filepath', () => {
    expect(pathRoot('/')).toBe('/')
    expect(pathRoot('/dir/file.txt')).toBe('/')
    expect(pathRoot('C:/dir/file.txt')).toBe('C:/')
    expect(pathRoot('//server/share/dir/file.txt')).toBe('//server/share/')
  })
})
