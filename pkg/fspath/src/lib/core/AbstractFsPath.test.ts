import fs from 'fs'
import * as npath from 'path'
import { AbstractFsPath } from './AbstractFsPath'

describe(AbstractFsPath.name, () => {
  class ExtendsAbstractFsPath extends AbstractFsPath {
    constructor(absolute: string | string[], _unsafe = false) {
      super(absolute, _unsafe)
    }
  }

  describe('constructor', () => {
    it('should create an instance with an absolute path string', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.absolute).toBe(__filename)
    })

    it('should create an instance with an absolute path array', () => {
      const path = new ExtendsAbstractFsPath(['c:', 'path', 'to', 'file'])
      expect(path.absolute).toBe(npath.join('c:', 'path', 'to', 'file'))
    })

    it('should throw an error if the path is not absolute', () => {
      expect(() => {
        new ExtendsAbstractFsPath('path/to/file')
      }).toThrowError('Expected absolute filepath. Got: path/to/file')
    })

    it('should not throw when creating an instance without in checks if _safe is true even if illegal relative path', () => {
      const illegalPath = 'path/to/file'
      expect(() => new ExtendsAbstractFsPath(illegalPath, true)).not.toThrow()
    })
  })

  describe('absolute', () => {
    it('should return the absolute path', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.absolute).toBe(__filename)
    })
  })

  describe('relative', () => {
    it('should return the relative path', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.relative).toBe(npath.join('src', 'lib', 'core', 'AbstractFsPath.test.ts'))
    })
  })

  describe('root', () => {
    it('should return the root directory', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.root).toBe('C:\\')
    })
  })

  describe('base', () => {
    it('should return the file/directory name with extension', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.base).toBe('AbstractFsPath.test.ts')
    })
  })

  describe('name', () => {
    it('should return the file/directory name without extension', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.name).toBe('AbstractFsPath.test')
    })
  })

  describe('parentPath', () => {
    it('should return the parent directory path', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.parentPath).toBe(npath.join(process.cwd(), 'src', 'lib', 'core'))
    })
  })

  describe('exists', () => {
    it('should return false if the file exists', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.exists).toBe(true)
    })

    it('should return false if the file does not exist', () => {
      const path = new ExtendsAbstractFsPath(__filename + '.blah')
      expect(path.exists).toBe(false)
    })
  })

  describe('statSync', () => {
    it('should return the fs.Stats object', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      const stats = path.statSync()
      expect(stats).toBeInstanceOf(fs.Stats)
    })
  })

  describe('stat', () => {
    it('should return a Promise that resolves to the fs.Stats object', async () => {
      const path = new ExtendsAbstractFsPath(__filename)
      const stats = await path.stat()
      expect(stats).toBeInstanceOf(fs.Stats)
    })
  })

  describe('toArray', () => {
    it('should return an array of path segments', () => {
      const path = new ExtendsAbstractFsPath('c:/path/to/file.txt')
      const segments = path.toArray()
      expect(segments).toEqual(['c:', 'path', 'to', 'file.txt'])
    })
  })

  describe('relativeToArray', () => {
    it('should return an array of relative path segments', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      const segments = path.relativeToArray()
      expect(segments).toEqual(['src', 'lib', 'core', 'AbstractFsPath.test.ts'])
    })
  })

  describe('isDirectoryPath', () => {
    it('should return false', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.isDirectoryPath).toBe(false)
    })
  })

  describe('isFilePath', () => {
    it('should return false', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.isFilePath).toBe(false)
    })
  })

  describe('isBlockDevicePath', () => {
    it('should return false', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.isBlockDevicePath).toBe(false)
    })
  })

  describe('isSymbolicLinkPath', () => {
    it('should return false', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.isSymbolicLinkPath).toBe(false)
    })
  })

  describe('isCharacterDevicePath', () => {
    it('should return false', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.isCharacterDevicePath).toBe(false)
    })
  })

  describe('isFIFOPath', () => {
    it('should return false', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.isFIFOPath).toBe(false)
    })
  })

  describe('isSocketPath', () => {
    it('should return false', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.isSocketPath).toBe(false)
    })
  })

  describe('isDirectory', () => {
    it('should return true if the path is a directory', () => {
      const path = new ExtendsAbstractFsPath(__dirname)
      expect(path.isDirectory()).toBe(true)
    })

    it('should return false if the path is not a directory', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.isDirectory()).toBe(false)
    })
  })

  describe('isFile', () => {
    it('should return true if the path is a file', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.isFile()).toBe(true)
    })

    it('should return false if the path is not a file', () => {
      const path = new ExtendsAbstractFsPath(__dirname)
      expect(path.isFile()).toBe(false)
    })
  })

  describe('isBlockDevice', () => {
    it('should return false if the path is a block device', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.isBlockDevice()).toBe(false)
    })
  })

  describe('isSymbolicLink', () => {
    it('should return false if the path is a symbolic link', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.isSymbolicLink()).toBe(false)
    })
  })

  describe('isCharacterDevice', () => {
    it('should return false if the path is a character device', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.isCharacterDevice()).toBe(false)
    })
  })

  describe('isFIFO', () => {
    it('should return false if the path is a FIFO device', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.isFIFO()).toBe(false)
    })
  })

  describe('isSocket', () => {
    it('should return false if the path is a socket', () => {
      const path = new ExtendsAbstractFsPath(__filename)
      expect(path.isSocket()).toBe(false)
    })
  })
})
