import { Any } from '@bemoje/util'
import { createStringParserSelector } from '../util/createStringParserSelector'
import { createValidatorSelector } from '../util/createValidatorSelector'
import { Option, OptionValues } from 'commander'
import { realizeLazyProperty } from '../util/realizeLazyProperty'
import { setOptionShortName } from '../util/setOptionShortName'
import { TConfigValidator } from '../../types/TConfigValidator'
import { TStringParser } from '../../types/TStringParser'

/**
 * Wrapper around the @see Option class, for more intuitive construction.
 * @remarks Options are one of boolean, negated, required argument, or optional argument.
 */
export class OptionBuilder {
  protected readonly $: Option
  protected customParser?: TStringParser<Any>
  protected readonly customValidators: TConfigValidator<Any>[] = []

  constructor(flags: string) {
    this.$ = new Option(flags)
  }

  description(string: string) {
    this.$.description = string
    return this
  }
  negate(negate = true) {
    this.$.negate = negate
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
    if (this.$.isBoolean() || this.$.negate) {
      throw new Error('Cannot set parser on boolean option: ' + this.$.attributeName())
    }
    return createStringParserSelector(this, (parser: TStringParser<Any>) => (this.customParser = parser))
  }
  get validator() {
    if (this.$.isBoolean() || this.$.negate) {
      throw new Error('Cannot set validator on boolean option: ' + this.$.attributeName())
    }
    return createValidatorSelector(this, this.customValidators)
  }
  get get() {
    return realizeLazyProperty(this, 'get', new OptionReader(this.$, () => this.customParser, this.customValidators))
  }
}

class OptionReader {
  constructor(
    protected readonly $: Option,
    protected readonly getCustomParser: () => TStringParser<Any> | undefined,
    protected readonly customValidators: TConfigValidator<Any>[]
  ) {}

  get option() {
    return this.$
  }
  get description() {
    return this.$.description
  }
  get optional() {
    return this.$.optional
  }
  get negate() {
    return this.$.negate
  }
  get mandatory() {
    return this.$.mandatory
  }
  get hidden() {
    return this.$.hidden
  }
  get variadic() {
    return this.$.variadic
  }
  get short() {
    return this.$.short
  }
  get long() {
    return this.$.long
  }
  get preset() {
    return this.$.presetArg
  }
  get default() {
    return this.$.defaultValue
  }
  get choices() {
    return this.$.argChoices
  }
  get env() {
    return this.$.envVar
  }
  get flags() {
    return this.$.flags
  }
  get name() {
    return this.$.name()
  }
  get attributeName() {
    return this.$.attributeName()
  }
  get fullDescription() {
    return this.$.fullDescription()
  }
  get defaultValueDescription() {
    return this.$.defaultValueDescription
  }
  get parser() {
    return this.getCustomParser()
  }
  get validators() {
    return this.customValidators.slice()
  }
}
