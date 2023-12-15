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
  userConfirmation?: { predicate: (arg: string) => boolean; message: string }

  constructor(readonly cmd: CommandBuilder, name: string) {
    this.$ = new Argument(name)
    this.index = cmd.meta.argValidators.length
    cmd.meta.argValidators[this.index] = []
    this.cmd.meta.argBuilders.push(this)
  }

  get hasValidators() {
    return this.cmd.meta.argValidators[this.index].length > 0
  }

  get hasParser() {
    return this.cmd.meta.argParsers[this.index] !== undefined
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

  /**
   * Only works with async actionHandlers.
   */
  userMustConfirmIf(options: { predicate: (arg: string) => boolean; message: string }) {
    this.userConfirmation = options
    return this
  }
}
