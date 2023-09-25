import path from 'path'
import { pathBasename } from './pathBasename'

describe(pathBasename.name, () => {
  it('should be path.join.', () => {
    expect(pathBasename).toBe(path.basename)
  })
})
