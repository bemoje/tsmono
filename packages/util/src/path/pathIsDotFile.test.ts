import { pathIsDotFile } from './pathIsDotFile'

describe(pathIsDotFile.name, () => {
  it('should work for dot-files.', () => {
    expect(pathIsDotFile('.git')).toBe(true)
    expect(pathIsDotFile('.travis.yml')).toBe(true)
    expect(pathIsDotFile('.editorconfig')).toBe(true)
    expect(pathIsDotFile('/.git')).toBe(true)
    expect(pathIsDotFile('a/b.c.d/e.js/.git')).toBe(true)
    expect(pathIsDotFile('a/.b/c/.gitignore')).toBe(true)
    expect(pathIsDotFile('a/.gitignore')).toBe(true)
    expect(pathIsDotFile('a/b/c/d/.gitignore')).toBe(true)
  })

  it('should work for non dot-files.', () => {
    expect(pathIsDotFile('a/b/c/d/e.js')).toBe(false)
    expect(pathIsDotFile('a/b.js')).toBe(false)
    expect(pathIsDotFile('a/.git/c/a.js')).toBe(false)
    expect(pathIsDotFile('.github/contributor.md')).toBe(false)
    expect(pathIsDotFile('.git/foo')).toBe(false)
  })
})
