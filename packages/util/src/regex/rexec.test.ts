import { rexec } from './rexec'

describe('rexec', () => {
  it('example', () => {
    const re = /(?<g1>a)/g
    const str = 'Anthony wants a girlfriend.'
    const result = [...rexec(re, str)]
    expect(result).toStrictEqual([
      {
        index: 9,
        match: 'a',
        groups: { g1: 'a' },
        lastIndex: 10,
      },
      {
        index: 14,
        match: 'a',
        groups: { g1: 'a' },
        lastIndex: 15,
      },
    ])
  })

  it('should return an empty generator if the string does not match the regex', () => {
    const generator = rexec(/abc/, 'def')
    expect(generator.next().done).toBe(true)
  })

  it('should return a generator that yields the correct match details', () => {
    const generator = rexec(/a(b)c/, 'abc')
    const result = generator.next()
    expect(result.done).toBe(false)
    expect(result.value).toEqual({
      index: 0,
      lastIndex: 0,
      groups: {},
      match: 'abc',
    })
  })

  it('should return a generator that yields the correct match details for multiple matches', () => {
    const generator = rexec(/a(b)c/g, 'abc abc')
    const result1 = generator.next()
    expect(result1.done).toBe(false)
    expect(result1.value).toEqual({
      index: 0,
      lastIndex: 3,
      groups: {},
      match: 'abc',
    })
    const result2 = generator.next()
    expect(result2.done).toBe(false)
    expect(result2.value).toEqual({
      index: 4,
      lastIndex: 7,
      groups: {},
      match: 'abc',
    })
    expect(generator.next().done).toBe(true)
  })

  it('should correctly handle regex with groups', () => {
    const generator = rexec(/a(b)c/g, 'abc')
    const result = generator.next()
    expect(result.done).toBe(false)
    expect(result.value).toEqual({
      index: 0,
      lastIndex: 3,
      groups: {},
      match: 'abc',
    })
  })
})
