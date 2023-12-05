import { ArgumentBuilder } from '../../core/CommandBuilder/ArgumentBuilder'
import { Base } from '../../core/CommandBuilder/Base'
import { createTypedListParser } from '../createTypedListParser'
import { JsonValue } from '@bemoje/util'
import { OptionBuilder } from '../../core/CommandBuilder/OptionBuilder'
import { parseInteger } from '../parseInteger'
import { parseNumber } from '../parseNumber'
import { parseString } from '../parseString'
import { TStringParser } from '../../types/TStringParser'

export abstract class AbstractStringParserSelector<Builder extends ArgumentBuilder | OptionBuilder> extends Base {
  constructor(protected readonly builder: Builder) {
    super()
  }

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
