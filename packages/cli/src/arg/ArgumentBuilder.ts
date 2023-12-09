import { Argument } from 'commander'
import { ArgumentParserSelector } from './ArgumentParserSelector'
import { ArgumentReader } from './ArgumentReader'
import { ArgumentValidatorSelector } from './ArgumentValidatorSelector'
import { CommandBuilder } from '../cmd/CommandBuilder'
import { countInstance } from '../core/counter'
import { realizeLazyProperty } from '@bemoje/util'

/**
 * Wrapper around the @see Argument class, for more intuitive construction.
 */
export class ArgumentBuilder {
  readonly $: Argument
  readonly index: number

  constructor(readonly cmd: CommandBuilder, name: string) {
    countInstance(ArgumentBuilder)
    this.$ = new Argument(name)
    this.index = cmd.meta.argValidators.length
    cmd.meta.argValidators[this.index] = []
  }

  description(string: string) {
    this.$.description = string
    return this
  }

  default(value: unknown, description?: string) {
    if (this.$.required) {
      throw new Error('Cannot set default value on required argument: ' + this.$.name())
    }
    this.$.default(value, description)
    return this
  }

  choices(values: readonly string[]) {
    this.$.choices(values)
    return this
  }

  get parser() {
    return new ArgumentParserSelector(this)
  }

  get validator() {
    return new ArgumentValidatorSelector(this)
  }

  get get() {
    return realizeLazyProperty(this, 'get', new ArgumentReader(this))
  }
}
