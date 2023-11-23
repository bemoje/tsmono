import { Any } from '@bemoje/util'
import { createStringParserSelector } from '../util/createStringParserSelector'
import { createValidatorSelector } from '../util/createValidatorSelector'
import { Option, OptionValues } from 'commander'
import { setOptionShortName } from '../util/setOptionShortName'
import { TConfigValidator } from './CommandBuilder'
import { TStringParser } from '../../parsers/TStringParser'

/**
 * Wrapper around the @see commander.Option class, for more intuitive construction.
 * @remarks Options are one of boolean, negated, required argument, or optional argument.
 */
export class OptionBuilder {
  $: Option
  customArgParser?: TStringParser<Any>
  customArgValidators: TConfigValidator<Any>[] = []
  constructor(flags: string) {
    this.$ = new Option(flags)
  }
  description(string: string) {
    this.$.description = string
    return this
  }
  // getDescription(): string {
  //   return this.$.description
  // }
  // getOptional(): boolean {
  //   return this.$.optional
  // }
  negate(negate = true): this {
    this.$.negate = negate
    return this
  }
  // getNegate(): boolean {
  //   return this.$.negate
  // }
  mandatory(mandatory = true): this {
    this.$.makeOptionMandatory(mandatory)
    return this
  }
  // getMandatory(): boolean {
  //   return this.$.mandatory
  // }
  hideHelp(hide = true): this {
    this.$.hideHelp(hide)
    return this
  }
  hidden(hidden = true): this {
    this.$.hidden = hidden
    return this
  }
  // getHidden(): boolean {
  //   return this.$.hidden
  // }
  // getVariadic(): boolean {
  //   return this.$.variadic
  // }
  // getShort(): string | undefined {
  //   return this.$.short
  // }
  // getLong(): string | undefined {
  //   return this.$.long
  // }
  preset(arg: unknown): this {
    this.$.preset(arg)
    return this
  }
  // getPreset(): unknown | undefined {
  //   return this.$.presetArg
  // }
  default(value: unknown, description?: string) {
    if (!this.$.optional) {
      throw new Error('Cannot set default value on required option: ' + this.$.name())
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
  conflicts(names: string | string[]): this {
    this.$.conflicts(names)
    return this
  }
  implies(optionValues: OptionValues): this {
    this.$.implies(optionValues)
    return this
  }
  env(name: string): this {
    this.$.env(name)
    return this
  }
  // getEnv(): string | undefined {
  //   return this.$.envVar
  // }
  get parser() {
    if (this.$.isBoolean() || this.$.negate) {
      throw new Error('Cannot set parser on boolean option: ' + this.$.attributeName())
    }
    return createStringParserSelector(this)
  }
  get validator() {
    if (this.$.isBoolean() || this.$.negate) {
      throw new Error('Cannot set validator on boolean option: ' + this.$.attributeName())
    }
    return createValidatorSelector(this)
  }
  // getParser<T>(): TStringParser<T> | undefined {
  //   return this.$.parseArg
  // }
  // getFlags(): string {
  //   return this.$.flags
  // }
  // getName() {
  //   return this.$.name()
  // }
  // getAttributeName(): string {
  //   return this.$.attributeName()
  // }
  // getFullDescription(): string {
  //   return this.$.fullDescription()
  // }
  // getDefaultValueDescription(): string | undefined {
  //   return this.$.defaultValueDescription
  // }
  short(short: string): this {
    setOptionShortName(this.$, short)
    return this
  }
}
