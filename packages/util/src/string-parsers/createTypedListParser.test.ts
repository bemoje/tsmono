/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTypedListParser } from './createTypedListParser'
import { parseInteger } from './parseInteger'

describe(createTypedListParser.name, () => {
  const parse = createTypedListParser<number>(',', parseInteger)

  it('should parse a delimited string into a list of typed values using the provided parser', () => {
    expect(parse('1,2,3')).toEqual([1, 2, 3])
  })

  it('should trim whitespace from each value in the string', () => {
    expect(parse(' 1, 2,3 ')).toEqual([1, 2, 3])
  })

  it('should throw on an empty string', () => {
    expect(() => parse('')).toThrow()
  })
})
