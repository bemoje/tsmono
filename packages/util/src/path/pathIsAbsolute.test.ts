import path from 'path'
import { pathIsAbsolute } from './pathIsAbsolute'

describe(pathIsAbsolute.name, () => {
  it('should return true for absolute paths', function () {
    expect(pathIsAbsolute(__dirname)).toBe(true)
    expect(pathIsAbsolute(__filename)).toBe(true)
    expect(pathIsAbsolute(path.join(process.cwd()))).toBe(true)
    expect(pathIsAbsolute(path.resolve(process.cwd(), 'README.md'))).toBe(true)
    expect(pathIsAbsolute('/foo/a/b/c/d')).toBe(true)
    expect(pathIsAbsolute('/foo')).toBe(true)
  })

  it('should return false for relative paths', function () {
    expect(pathIsAbsolute('a/b/c.js')).toBe(false)
    expect(pathIsAbsolute('./foo')).toBe(false)
    expect(pathIsAbsolute(path.relative(process.cwd(), 'README.md'))).toBe(false)
  })

  it('should work with glob patterns', function () {
    expect(pathIsAbsolute(path.join(process.cwd(), 'pages/*.txt'))).toBe(true)
    expect(pathIsAbsolute('pages/*.txt')).toBe(false)
  })
})
