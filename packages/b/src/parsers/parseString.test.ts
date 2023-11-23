import { parseString } from './parseString'

describe(parseString.name, () => {
  it('should return the string untouched', () => {
    expect(parseString('foo')).toBe('foo')
  })
})
