import path from 'path'
import { pathRoot, pathRootPosix, pathRootWindows } from './pathRoot'

describe(pathRoot.name, () => {
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
        expect(pathRootPosix(fspath)).toBe(path.posix.parse(fspath).root)
      })
    }
  })

  describe('WIN32', () => {
    for (const fspath of paths) {
      it('should return same as the native path module for: ' + fspath, () => {
        expect(pathRootWindows(fspath)).toBe(path.win32.parse(fspath).root)
      })
    }
  })

  describe('OS', () => {
    for (const fspath of paths) {
      it('should return same as the native path module for: ' + fspath, () => {
        expect(pathRoot(fspath)).toBe(path.parse(fspath).root)
      })
    }
  })
})
