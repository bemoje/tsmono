import { pathExtname } from './pathExtname'

describe(pathExtname.name, () => {
  it('should return the extension of the filepath', () => {
    expect(pathExtname('/dir/file.txt')).toBe('.txt')
    expect(pathExtname('/dir/')).toBe('')
    expect(pathExtname('/')).toBe('')
    expect(pathExtname('C:/dir/file.txt')).toBe('.txt')
    expect(pathExtname('C:/dir/')).toBe('')
    expect(pathExtname('C:/')).toBe('')
    expect(pathExtname('//server/share/dir/file.txt')).toBe('.txt')
    expect(pathExtname('//server/share/dir/')).toBe('')
    expect(pathExtname('//server/share/')).toBe('')
  })
})
