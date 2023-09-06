import { rexecFirstMatch } from './rexecFirstMatch'

describe('reexecFirstMatch', () => {
  it('should return the first match of a regular expression in a string', () => {
    const regex = /world/g
    const string = 'hello world, world'
    const result = rexecFirstMatch(regex, string)
    expect(result).toEqual({
      index: 6,
      lastIndex: 11,
      groups: {},
      match: 'world',
    })
  })

  it('should return undefined if no match is found', () => {
    const regex = /world/g
    const string = 'hello'
    const result = rexecFirstMatch(regex, string)
    expect(result).toBeUndefined()
  })

  it('should return the first match with groups', () => {
    const regex = /(world)/g
    const string = 'hello world, world'
    const result = rexecFirstMatch(regex, string)
    expect(result).toEqual({
      index: 6,
      lastIndex: 11,
      groups: {},
      match: 'world',
    })
  })

  it('should return the first match with named groups', () => {
    const regex = /(?<greeting>world)/g
    const string = 'hello world, world'
    const result = rexecFirstMatch(regex, string)
    expect(result).toEqual({
      index: 6,
      lastIndex: 11,
      groups: { greeting: 'world' },
      match: 'world',
    })
  })

  it('should return the first match with flags', () => {
    const regex = /WORLD/gi
    const string = 'hello WORLD, world'
    const result = rexecFirstMatch(regex, string)
    expect(result).toEqual({
      index: 6,
      lastIndex: 11,
      groups: {},
      match: 'WORLD',
    })
  })
})
