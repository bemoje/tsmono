import { Argument } from '@commander-js/extra-typings'
import { ArgumentParserSelector } from './ArgumentParserSelector'
import { ArgumentReader } from './ArgumentReader'
import { ArgumentValidatorSelector } from './ArgumentValidatorSelector'
import { CommandBuilder } from '../cmd/CommandBuilder'
import { realizeLazyProperty } from '@bemoje/util'

/**
 * Wrapper around the @see Argument class from 'commander'.
 */
export class ArgumentBuilder {
  readonly $: Argument
  readonly index: number

  constructor(readonly cmd: CommandBuilder, name: string) {
    this.$ = new Argument(name)
    this.index = cmd.meta.argValidators.length
    cmd.meta.argValidators[this.index] = []
  }

  description(string: string) {
    this.$.description = string
    return this
  }

  default(value: unknown, description?: string) {
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
