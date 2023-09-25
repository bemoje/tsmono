import { pathExtnamePosix } from './pathExtnamePosix'

describe(pathExtnamePosix.name, () => {
  it('should return the extension of the filepath', () => {
    expect(pathExtnamePosix('/dir/file.txt')).toBe('.txt')
    expect(pathExtnamePosix('/dir/')).toBe('')
    expect(pathExtnamePosix('/')).toBe('')
  })
})
