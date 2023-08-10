import path from 'path'
import { cwdpath } from './cwdpath'

describe(cwdpath.name, () => {
  const sep = path.sep

  describe('when the current working directory is "/home/user"', () => {
    beforeEach(() => {
      jest.spyOn(process, 'cwd').mockReturnValue('/home/user')
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should join the paths correctly', () => {
      const result = cwdpath('dir1', 'dir2', 'file.txt')
      expect(result).toBe(`${sep}home${sep}user${sep}dir1${sep}dir2${sep}file.txt`)
    })
  })

  describe('when the current working directory is "/home/user" and no paths are given', () => {
    beforeEach(() => {
      jest.spyOn(process, 'cwd').mockReturnValue('/home/user')
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should return the current working directory', () => {
      const result = cwdpath()
      expect(result).toBe(`${sep}home${sep}user`)
    })
  })

  describe('when the current working directory is "/" and the given paths are ["dir1", "dir2"]', () => {
    beforeEach(() => {
      jest.spyOn(process, 'cwd').mockReturnValue('/')
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should join the paths correctly', () => {
      const result = cwdpath('dir1', 'dir2')
      expect(result).toBe(`${sep}dir1${sep}dir2`)
    })
  })
})
