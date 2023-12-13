import { ArgumentBuilder } from '../arg/ArgumentBuilder'
import { createTypedListParser } from '../util/string-parsers/createTypedListParser'
import type { JsonValue } from '../util/types/JsonValue'
import { OptionBuilder } from '../opt/OptionBuilder'
import { parseInteger } from '../util/string-parsers/parseInteger'
import { parseNumber } from '../util/string-parsers/parseNumber'
import { parseString } from '../util/string-parsers/parseString'
import type { TStringParser } from '../util/types/TStringParser'

export abstract class ParserSelector<Builder extends ArgumentBuilder | OptionBuilder> {
  constructor(protected readonly builder: Builder) {}

  abstract custom<T extends JsonValue>(parser: TStringParser<T>): Builder

  string() {
    return this.custom<string>(parseString)
  }
  number() {
    return this.custom<number>(parseNumber)
  }
  integer() {
    return this.custom<number>(parseInteger)
  }

  delimitedStrings(delimiter = ',') {
    return this.delimited<string>(delimiter, parseString)
  }
  delimitedNumbers(delimiter = ',') {
    return this.delimited<number>(delimiter, parseNumber)
  }
  delimitedIntegers(delimiter = ',') {
    return this.delimited<number>(delimiter, parseInteger)
  }

  delimited<T extends JsonValue>(delimiter = ',', parser: TStringParser<T>) {
    return this.custom(createTypedListParser(delimiter, parser))
  }
}
