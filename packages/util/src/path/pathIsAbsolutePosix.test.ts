import { pathIsAbsolutePosix } from './pathIsAbsolutePosix'

describe(pathIsAbsolutePosix.name, () => {
  it('should support unices', function () {
    expect(pathIsAbsolutePosix('/foo/bar')).toBe(true)
    expect(pathIsAbsolutePosix('foo/bar')).toBe(false)
    expect(pathIsAbsolutePosix('/user/docs/Letter.txt')).toBe(true)
  })
})
