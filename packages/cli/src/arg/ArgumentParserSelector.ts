import { ArgumentBuilder } from './ArgumentBuilder'
import type { JsonValue } from '@bemoje/util'
import { ParserSelector } from '../core/ParserSelector'
import type { TStringParser } from '@bemoje/util'

export class ArgumentParserSelector extends ParserSelector<ArgumentBuilder> {
  constructor(builder: ArgumentBuilder) {
    super(builder)
  }
  custom<T extends JsonValue>(parser: TStringParser<T>) {
    this.builder.cmd.meta.argParsers[this.builder.index] = parser
    return this.builder
  }
}
