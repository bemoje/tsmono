import { Base } from './Base'
import { optHasArgument } from '../util/optHasArgument'
import { OptionBuilder } from './OptionBuilder'

export class OptionReader extends Base {
  constructor(protected readonly parent: OptionBuilder) {
    super()
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
  // get negate() {
  //   return this.$.negate
  // }
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
  // get preset() {
  //   return this.$.presetArg
  // }
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
  get hasArgument() {
    return optHasArgument(this.parent.$)
  }
}
