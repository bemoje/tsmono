import { Any } from '@bemoje/util'
import { Argument } from 'commander'
import { createStringParserSelector } from '../util/createStringParserSelector'
import { createValidatorSelector } from '../util/createValidatorSelector'
import { parseString } from '../../parsers/parseString'
import { realizeLazyProperty } from '../util/realizeLazyProperty'
import { TConfigValidator } from '../../types/TConfigValidator'
import { TStringParser } from '../../types/TStringParser'

/**
 * Wrapper around the @see commander.Argument class, for more intuitive construction.
 */
export class ArgumentBuilder {
  protected readonly $: Argument
  protected customParser: TStringParser<Any> = parseString
  protected readonly customValidators: TConfigValidator<Any>[] = []

  constructor(name: string) {
    this.$ = new Argument(name)
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
    return createStringParserSelector(this, (parser: TStringParser<Any>) => (this.customParser = parser))
  }

  get validator() {
    return createValidatorSelector(this, this.customValidators)
  }

  get get() {
    return realizeLazyProperty(this, 'get', new ArgumentReader(this.$, () => this.customParser, this.customValidators))
  }
}

class ArgumentReader {
  constructor(
    protected readonly $: Argument,
    protected readonly getCustomParser: () => TStringParser<Any>,
    protected readonly customValidators: TConfigValidator<Any>[]
  ) {}

  get argument() {
    return this.$
  }
  get name() {
    return this.$.name()
  }
  get choices() {
    return this.$.argChoices
  }
  get default() {
    return this.$.defaultValue
  }
  get description() {
    return this.$.description
  }
  get variadic() {
    return this.$.variadic
  }
  get required() {
    return this.$.required
  }
  get optional() {
    return !this.$.required
  }
  get parser() {
    return this.getCustomParser()
  }
  get validators() {
    return this.customValidators.slice()
  }
}
