import { createTupleListParser } from './createTupleListParser'
import { parseBoolean } from './parseBoolean'
import { parseInteger } from './parseInteger'
import { parseNumber } from './parseNumber'
import { parseString } from './parseString'

describe(createTupleListParser.name, () => {
  const parse = createTupleListParser<string | number | boolean>(',', [
    parseInteger,
    parseString,
    parseBoolean,
    parseNumber,
  ])

  it('should parse a delimited string into a list of typed values using the provided parsers', () => {
    expect(parse('1,a,true,2.4')).toEqual([1, 'a', true, 2.4])
  })

  it('should trim whitespace from each value in the string', () => {
    expect(parse(' 1,  a, true ,2.4')).toEqual([1, 'a', true, 2.4])
  })

  it('should throw on an empty string', () => {
    expect(() => parse('')).toThrow()
  })

  it('should throw an error if the number of values does not match the number of parsers', () => {
    expect(() => parse('1,a,true')).toThrow()
  })
})
