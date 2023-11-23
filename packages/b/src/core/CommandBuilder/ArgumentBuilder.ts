import { Any } from '@bemoje/util'
import { Argument } from 'commander'
import { createStringParserSelector } from '../util/createStringParserSelector'
import { parseString } from '../../parsers/parseString'
import { TStringParser } from '../../parsers/TStringParser'

/**
 * Wrapper around the @see commander.Argument class, for more intuitive construction.
 */
export class ArgumentBuilder {
  $: Argument
  customArgParser: TStringParser<Any> = parseString
  constructor(name: string) {
    this.$ = new Argument(name)
  }
  description(string: string) {
    this.$.description = string
    return this
  }
  // getDescription(): string {
  //   return this.$.description
  // }
  // getVariadic(): boolean {
  //   return this.$.variadic
  // }
  // getOptional(): boolean {
  //   return !this.$.required
  // }
  default(value: unknown, description?: string) {
    if (this.$.required) {
      throw new Error('Cannot set default value on required argument: ' + this.$.name())
    }
    this.$.default(value, description)
    return this
  }
  // getDefault(): unknown | undefined {
  //   return this.$.defaultValue
  // }
  choices(values: readonly string[]): this {
    this.$.choices(values)
    return this
  }
  // getChoices(): readonly string[] | undefined {
  //   return this.$.argChoices
  // }
  get parser() {
    return createStringParserSelector(this)
  }
}
