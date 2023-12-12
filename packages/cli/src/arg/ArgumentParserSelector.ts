import { ArgumentBuilder } from './ArgumentBuilder'
import { JsonValue, TStringParser } from '@bemoje/util'
import { ParserSelector } from '../core/ParserSelector'

export class ArgumentParserSelector extends ParserSelector<ArgumentBuilder> {
  constructor(builder: ArgumentBuilder) {
    super(builder)
  }
  custom<T extends JsonValue>(parser: TStringParser<T>) {
    this.builder.cmd.meta.argParsers[this.builder.index] = parser
    return this.builder
  }
}
