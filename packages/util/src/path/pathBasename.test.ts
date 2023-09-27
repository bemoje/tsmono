import path from 'path'
import { pathBasename, pathBasenamePosix, pathBasenameWindows } from './pathBasename'

describe(pathBasename.name, () => {
  let paths = [
    '/dir/file.txt.',
    '/dir/file.txt',
    '/dir/.',
    '/dir/',
    '/dir',
    '/file.txt.',
    '/file.txt',
    '/.',
    '/',
    'C:/dir/file.txt.',
    'C:/dir/file.txt',
    'C:/dir/.',
    'C:/dir/',
    'C:/dir',
    'C:/file.txt.',
    'C:/file.txt',
    'C:/.',
    'C:/',
    'C://dir/file.txt.',
    'C://dir/file.txt',
    'C://dir/.',
    'C://dir/',
    'C://dir',
    'C://file.txt.',
    'C://file.txt',
    'C://.',
    'C://',
    '//server/share/file.txt.',
    '//server/share/file.txt',
    '//server/share/.',
    '//server/share/',
    '//server/share',
    '//server/file.txt.',
    '//server/.',
    '//server/',
    '//server',
    '//file.txt.',
    '//file.txt',
    '//.',
    '//',
    '.',
    './',
    'abc/def/file.txt.',
    'abc/def/file.txt',
    'abc/def/.',
    'abc/def/',
    'abc/def',
    'abc/file.txt.',
    'abc/file.txt',
    'abc/.',
    'abc/',
    'abc',
    'file.txt.',
    'file.txt',
    './abc/def/file.txt.',
    './abc/def/file.txt',
    './abc/def/.',
    './abc/def/',
    './abc/def',
    './abc/file.txt.',
    './abc/file.txt',
    './abc/.',
    './abc/',
    './abc',
    './file.txt.',
    './file.txt',
  ]
  paths = paths.concat(paths.map((p) => p.replace(/\//g, '\\')))

  describe('POSIX', () => {
    for (const fspath of paths) {
      it('should return same as the native path module for: ' + fspath, () => {
        expect(pathBasenamePosix(fspath)).toBe(path.posix.basename(fspath))
      })
    }
  })

  describe('WIN32', () => {
    for (const fspath of paths) {
      it('should return same as the native path module for: ' + fspath, () => {
        expect(pathBasenameWindows(fspath)).toBe(path.win32.basename(fspath))
      })
    }
  })

  describe('OS', () => {
    for (const fspath of paths) {
      it('should return same as the native path module for: ' + fspath, () => {
        expect(pathBasename(fspath)).toBe(path.basename(fspath))
      })
    }
  })
})
