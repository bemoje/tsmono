import { getHomeDirectory } from './getHomeDirectory'

describe(getHomeDirectory.name, () => {
  it('gets the os home directory', () => {
    expect(typeof getHomeDirectory()).toBe('string')
  })
})
