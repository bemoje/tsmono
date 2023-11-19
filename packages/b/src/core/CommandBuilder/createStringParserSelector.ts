import { ArgumentBuilder } from './ArgumentBuilder'
import { createTypedListParser } from '../../parsers/createTypedListParser'
import { OptionBuilder } from './OptionBuilder'
import { parseInteger } from '../../parsers/parseInteger'
import { parseNumber } from '../../parsers/parseNumber'
import { parseString } from '../../parsers/parseString'
import { TStringParser } from '../../parsers/TStringParser'

export function createStringParserSelector(this: ArgumentBuilder | OptionBuilder) {
  const createChoice = <T>(parser: TStringParser<T>) => {
    return () => {
      this.customArgParser = parser
      return this
    }
  }

  return {
    custom: <T>(parser: TStringParser<T>) => {
      return () => createChoice(parser)()
    },

    string: createChoice(parseString),
    delimitedStrings: (delimiter = ',') => createChoice(createTypedListParser(delimiter, parseString))(),

    number: createChoice(parseNumber),
    delimitedNumbers: (delimiter = ',') => createChoice(createTypedListParser(delimiter, parseNumber))(),

    integer: createChoice(parseInteger),
    delimitedIntegers: (delimiter = ',') => createChoice(createTypedListParser(delimiter, parseInteger))(),
  }
}
