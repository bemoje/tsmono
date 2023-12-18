import path from 'path'
import { pathJoin } from './pathJoin'

describe(pathJoin.name, () => {
  it('should be path.join.', () => {
    expect(pathJoin).toBe(path.join)
  })
})
