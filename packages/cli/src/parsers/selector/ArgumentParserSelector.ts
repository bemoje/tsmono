import { AbstractStringParserSelector } from './AbstractStringParserSelector'
import { ArgumentBuilder } from '../../core/CommandBuilder/ArgumentBuilder'
import { JsonValue } from '@bemoje/util'
import { TStringParser } from '../../types/TStringParser'

export class ArgumentParserSelector extends AbstractStringParserSelector<ArgumentBuilder> {
  custom<T extends JsonValue>(parser: TStringParser<T>) {
    this.builder.cmd.meta.argParsers[this.builder.index] = parser
    return this.builder
  }
}
