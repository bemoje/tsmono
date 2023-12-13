import { CommandBuilder } from '../cmd/CommandBuilder'
import { Option } from '@commander-js/extra-typings'
import { OptionArgumentParserSelector } from './OptionArgumentParserSelector'
import { OptionArgumentValidatorSelector } from './OptionArgumentValidatorSelector'
import { OptionHelpers } from './OptionHelpers'
import { OptionReader } from './OptionReader'
import type { OptionValues } from '@commander-js/extra-typings'
import { realizeLazyProperty } from '@bemoje/util'

/**
 * Wrapper around the @see Option class, for more intuitive construction.
 * @remarks Options are one of boolean, negated, required argument, or optional argument.
 */
export class OptionBuilder {
  readonly $: Option

  constructor(readonly cmd: CommandBuilder, flags: string) {
    this.$ = new Option(flags)
    if (!OptionHelpers.hasArgument(this.$) && this.$.long?.startsWith('--no-')) {
      this.$.default(true)
    }
  }
  description(string: string) {
    this.$.description = string
    return this
  }
  mandatory(mandatory = true) {
    this.$.makeOptionMandatory(mandatory)
    return this
  }
  hideHelp(hide = true) {
    this.$.hideHelp(hide)
    return this
  }
  hidden(hidden = true) {
    this.$.hidden = hidden
    return this
  }
  preset(arg: unknown) {
    this.$.preset(arg)
    return this
  }
  default(value: unknown, description?: string) {
    this.$.default(value, description)
    return this
  }
  choices(values: readonly string[]) {
    if (!OptionHelpers.hasArgument(this.$)) {
      throw new Error('Cannot set choices on option with no argument: ' + this.$.name())
    }
    this.$.choices(values)
    return this
  }
  conflicts(names: string | string[]) {
    this.$.conflicts(names)
    return this
  }
  implies(optionValues: OptionValues) {
    this.$.implies(optionValues)
    return this
  }
  env(name: string) {
    this.$.env(name)
    return this
  }
  short(short: string) {
    OptionHelpers.setShort(this.$, short)
    return this
  }
  get parser() {
    if (!OptionHelpers.hasArgument(this.$)) {
      throw new Error('Cannot set parser on option with no argument: ' + this.$.attributeName())
    }
    return new OptionArgumentParserSelector(this)
  }
  get validator() {
    if (!OptionHelpers.hasArgument(this.$)) {
      throw new Error('Cannot set validator on option with no argument: ' + this.$.attributeName())
    }
    return new OptionArgumentValidatorSelector(this)
  }
  get get() {
    return realizeLazyProperty(this, 'get', new OptionReader(this))
  }
}
