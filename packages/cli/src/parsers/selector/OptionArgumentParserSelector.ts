import { AbstractStringParserSelector } from './AbstractStringParserSelector'
import { JsonValue } from '@bemoje/util'
import { OptionBuilder } from '../../core/CommandBuilder/OptionBuilder'
import { TStringParser } from '../../types/TStringParser'

export class OptionArgumentParserSelector extends AbstractStringParserSelector<OptionBuilder> {
  custom<T extends JsonValue>(parser: TStringParser<T>) {
    const name = this.builder.$.attributeName()
    this.builder.cmd.meta.optParsers[name] = parser
    return this.builder
  }
}
