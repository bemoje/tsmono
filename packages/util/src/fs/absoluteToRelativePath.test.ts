import path from 'path'
import { absoluteToRelativePath } from './absoluteToRelativePath'

describe('absoluteToRelativePath', () => {
  it('should convert an absolute path to a relative path', () => {
    const filepath = path.join(process.cwd(), 'pkg', 'fs', 'src', 'index.ts')
    const expected = 'pkg' + path.sep + 'fs' + path.sep + 'src' + path.sep + 'index.ts'
    const result = absoluteToRelativePath(filepath)
    expect(result).toEqual(expected)
  })
})
