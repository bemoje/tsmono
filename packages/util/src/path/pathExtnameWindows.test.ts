import { pathExtnameWindows } from './pathExtnameWindows'

describe(pathExtnameWindows.name, () => {
  it('should return the extension of the filepath', () => {
    expect(pathExtnameWindows('C:/dir/file.txt')).toBe('.txt')
    expect(pathExtnameWindows('C:/dir/')).toBe('')
    expect(pathExtnameWindows('C:/')).toBe('')
    expect(pathExtnameWindows('//server/share/dir/file.txt')).toBe('.txt')
    expect(pathExtnameWindows('//server/share/dir/')).toBe('')
    expect(pathExtnameWindows('//server/share/')).toBe('')
  })
})
