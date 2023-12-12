import { countInstance } from '../core/counter'
import { OptionBuilder } from './OptionBuilder'
import { OptionHelpers } from './OptionHelpers'

export class OptionReader {
  constructor(protected readonly parent: OptionBuilder) {
    countInstance(OptionReader)
  }

  get $() {
    return this.parent.$
  }
  get option() {
    return this.parent.$
  }
  get description() {
    return this.$.description
  }
  get optional() {
    return this.$.optional
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
  get defaultValueDescription() {
    return this.$.defaultValueDescription
  }
  get hasArgument() {
    return OptionHelpers.hasArgument(this.parent.$)
  }
}
