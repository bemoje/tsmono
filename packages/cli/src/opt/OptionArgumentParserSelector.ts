import { countInstance } from '../core/counter'
import { OptionBuilder } from './OptionBuilder'
import { ParserSelector } from '../core/ParserSelector'
import { TStringParser } from '@bemoje/util'

export class OptionArgumentParserSelector extends ParserSelector<OptionBuilder> {
  constructor(builder: OptionBuilder) {
    super(builder)
    countInstance(OptionArgumentParserSelector)
  }
  custom<T>(parser: TStringParser<T>) {
    const name = this.builder.$.attributeName()
    this.builder.cmd.meta.optParsers[name] = parser
    return this.builder
  }
}
