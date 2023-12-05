import { Argument } from 'commander'
import { ArgumentParserSelector } from '../../parsers/selector/ArgumentParserSelector'
import { ArgumentReader } from './ArgumentReader'
import { ArgumentValidatorSelector } from '../../validators/selector/ArgumentValidatorSelector'
import { Base } from './Base'
import { CommandBuilder } from './CommandBuilder'
import { realizeLazyProperty } from '../util/realizeLazyProperty'

/**
 * Wrapper around the @see Argument class, for more intuitive construction.
 */
export class ArgumentBuilder extends Base {
  readonly $: Argument
  readonly index: number

  constructor(readonly cmd: CommandBuilder, name: string) {
    super()
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
