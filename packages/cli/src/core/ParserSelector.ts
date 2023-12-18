import { ArgumentBuilder } from '../arg/ArgumentBuilder'
import { createTypedListParser } from '@bemoje/util'
import type { JsonValue } from '@bemoje/util'
import { OptionBuilder } from '../opt/OptionBuilder'
import { parseInteger } from '@bemoje/util'
import { parseNumber } from '@bemoje/util'
import { parseString } from '@bemoje/util'
import type { TStringParser } from '@bemoje/util'

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
