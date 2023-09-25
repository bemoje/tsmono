import path from 'path'
import { cwdpath } from './cwdpath'

describe(cwdpath.name, () => {
  describe('when the current working directory is "/home/user"', () => {
    beforeEach(() => {
      jest.spyOn(process, 'cwd').mockReturnValue('/home/user')
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should join the paths correctly', () => {
      const result = cwdpath('dir1', 'dir2', 'file.txt')
      expect(result).toBe(`${path.sep}home${path.sep}user${path.sep}dir1${path.sep}dir2${path.sep}file.txt`)
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
      expect(result).toBe(`${path.sep}home${path.sep}user`)
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
      expect(result).toBe(`${path.sep}dir1${path.sep}dir2`)
    })
  })
})
