import { randomString } from './randomString'

describe(randomString.name, () => {
  it('should return a string', () => {
    expect(typeof randomString()).toBe('string')
  })

  it('should work with alternative encodings', () => {
    expect(randomString(128, 'hex')).toHaveLength(32)
  })
})
