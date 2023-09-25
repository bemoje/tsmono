import { pathIsRelative } from './pathIsRelative'

describe(pathIsRelative.name, function () {
  it('should return true if the path appears to be relative', function () {
    expect(pathIsRelative('test/fixtures')).toBe(true)
    expect(pathIsRelative('test/fixtures/')).toBe(true)
    expect(pathIsRelative('test/fixtures/foo.txt')).toBe(true)
    expect(pathIsRelative('./test/fixtures/foo.txt')).toBe(true)
    expect(pathIsRelative('./test/fixtures/foo.txt')).toBe(true)
  })

  it('should return false if the path does not appear to be relative', function () {
    expect(pathIsRelative('/test/fixtures')).toBe(false)
    expect(pathIsRelative('/test/fixtures/')).toBe(false)
    expect(pathIsRelative('/test/fixtures/baz.md')).toBe(false)
    expect(pathIsRelative('e://test/fixtures/')).toBe(false)
    expect(pathIsRelative('e:/test/fixtures/')).toBe(false)
    expect(pathIsRelative('\\test\\fixtures\\')).toBe(false)
  })
})
