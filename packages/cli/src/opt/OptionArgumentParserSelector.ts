import { OptionBuilder } from './OptionBuilder'
import { ParserSelector } from '../core/ParserSelector'
import type { TStringParser } from '../util/types/TStringParser'

export class OptionArgumentParserSelector extends ParserSelector<OptionBuilder> {
  constructor(builder: OptionBuilder) {
    super(builder)
  }
  custom<T>(parser: TStringParser<T>) {
    const name = this.builder.$.attributeName()
    this.builder.cmd.meta.optParsers[name] = parser
    return this.builder
  }
}
