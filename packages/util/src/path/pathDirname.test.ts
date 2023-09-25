import path from 'path'
import { pathDirname } from './pathDirname'

describe(pathDirname.name, () => {
  it('should be path.join.', () => {
    expect(pathDirname).toBe(path.dirname)
  })
})
