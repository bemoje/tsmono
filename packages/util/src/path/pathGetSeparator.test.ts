import path from 'path'
import { pathGetSeparator } from './pathGetSeparator'

describe(pathGetSeparator.name, () => {
  it('should return forward slash if path contains forward slash', () => {
    expect(pathGetSeparator('path/to/file')).toBe('/')
    expect(pathGetSeparator('path/to\\file')).toBe('/')
    expect(pathGetSeparator('/path/to/file')).toBe('/')
  })

  it('should return backslash if path contains backslash', () => {
    expect(pathGetSeparator('path\\to\\file')).toBe('\\')
    expect(pathGetSeparator('path\\to/file')).toBe('\\')
    expect(pathGetSeparator('\\path\\to\\file')).toBe('\\')
  })

  it('should return platform-specific separator if path does not contain slash', () => {
    expect(pathGetSeparator('path-to-file')).toBe(path.sep)
  })
})
