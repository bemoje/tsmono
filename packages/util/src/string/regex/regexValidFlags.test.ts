import { regexValidFlags } from './regexValidFlags'

describe('regexValidFlags', () => {
  it('should return the expected flags', () => {
    expect(regexValidFlags()).toEqual(['g', 'i', 'm', 's', 'u', 'y'])
  })
})
