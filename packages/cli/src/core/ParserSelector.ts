import { ArgumentBuilder } from '../arg/ArgumentBuilder'
import { createTypedListParser } from '../parsers/createTypedListParser'
import { JsonValue } from '@bemoje/util'
import { OptionBuilder } from '../opt/OptionBuilder'
import { parseInteger } from '../parsers/parseInteger'
import { parseNumber } from '../parsers/parseNumber'
import { parseString } from '../parsers/parseString'
import { TStringParser } from '../types/TStringParser'

export abstract class ParserSelector<Builder extends ArgumentBuilder | OptionBuilder> {
  constructor(protected readonly builder: Builder) {}

  abstract custom<T extends JsonValue>(parser: TStringParser<T>): Builder

  string() {
    return this.custom(parseString)
  }
  number() {
    return this.custom(parseNumber)
  }
  integer() {
    return this.custom(parseInteger)
  }

  delimitedStrings(delimiter = ',') {
    return this.delimited(delimiter, parseString)
  }
  delimitedNumbers(delimiter = ',') {
    return this.delimited(delimiter, parseNumber)
  }
  delimitedIntegers(delimiter = ',') {
    return this.delimited(delimiter, parseInteger)
  }

  delimited<T extends JsonValue>(delimiter = ',', parser: TStringParser<T>) {
    return this.custom(createTypedListParser(delimiter, parser))
  }
}
