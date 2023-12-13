import { ArgumentBuilder } from './ArgumentBuilder'
import type { JsonValue } from '../util/types/JsonValue'
import { ParserSelector } from '../core/ParserSelector'
import type { TStringParser } from '../util/types/TStringParser'

export class ArgumentParserSelector extends ParserSelector<ArgumentBuilder> {
  constructor(builder: ArgumentBuilder) {
    super(builder)
  }
  custom<T extends JsonValue>(parser: TStringParser<T>) {
    this.builder.cmd.meta.argParsers[this.builder.index] = parser
    return this.builder
  }
}
