import { CommandBuilder } from '../cmd/CommandBuilder'
import { optHasArgument } from './util/optHasArgument'
import { Option, OptionValues } from 'commander'
import { OptionArgumentParserSelector } from './OptionArgumentParserSelector'
import { OptionArgumentValidatorSelector } from './OptionArgumentValidatorSelector'
import { OptionReader } from './OptionReader'
import { realizeLazyProperty } from '../core/util/realizeLazyProperty'
import { setOptionShortName } from './util/setOptionShortName'

/**
 * Wrapper around the @see Option class, for more intuitive construction.
 * @remarks Options are one of boolean, negated, required argument, or optional argument.
 */
export class OptionBuilder {
  readonly $: Option

  constructor(readonly cmd: CommandBuilder, flags: string) {
    this.$ = new Option(flags)
    if (this.$.isBoolean() && this.$.long?.startsWith('--no-')) {
      this.$.default(true)
    }
  }

  description(string: string) {
    this.$.description = string
    return this
  }
  // negate(negate = true) {
  //   this.$.negate = negate
  //   return this
  // }
  // mandatory(mandatory = true) {
  //   this.$.makeOptionMandatory(mandatory)
  //   return this
  // }
  hideHelp(hide = true) {
    this.$.hideHelp(hide)
    return this
  }
  hidden(hidden = true) {
    this.$.hidden = hidden
    return this
  }
  // preset(arg: unknown) {
  //   this.$.preset(arg)
  //   return this
  // }
  default(value: unknown, description?: string) {
    if (!optHasArgument(this.$)) {
      throw new Error('Cannot set default value on option without argument: ' + this.$.name())
    }
    if (!this.$.optional) {
      throw new Error('Cannot set default value on required option: ' + this.$.name())
    }
    this.$.default(value, description)
    return this
  }
  choices(values: readonly string[]) {
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
    setOptionShortName(this.$, short)
    return this
  }
  get parser() {
    if (this.$.isBoolean()) {
      throw new Error('Cannot set parser on boolean option: ' + this.$.attributeName())
    }
    return new OptionArgumentParserSelector(this)
  }
  get validator() {
    if (this.$.isBoolean()) {
      throw new Error('Cannot set validator on boolean option: ' + this.$.attributeName())
    }
    return new OptionArgumentValidatorSelector(this)
  }
  get get() {
    return realizeLazyProperty(this, 'get', new OptionReader(this))
  }
}
