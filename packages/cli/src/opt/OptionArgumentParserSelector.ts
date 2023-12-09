import { countInstance } from '../core/counter'
import { JsonValue } from '@bemoje/util'
import { OptionBuilder } from './OptionBuilder'
import { ParserSelector } from '../core/ParserSelector'
import { TStringParser } from '../types/TStringParser'

export class OptionArgumentParserSelector extends ParserSelector<OptionBuilder> {
  constructor(builder: OptionBuilder) {
    super(builder)
    countInstance(OptionArgumentParserSelector)
  }
  custom<T extends JsonValue>(parser: TStringParser<T>) {
    const name = this.builder.$.attributeName()
    this.builder.cmd.meta.optParsers[name] = parser
    return this.builder
  }
}
