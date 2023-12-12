import { ArgumentBuilder } from './ArgumentBuilder'
import { countInstance } from '../core/counter'

export class ArgumentReader {
  constructor(protected readonly parent: ArgumentBuilder) {
    countInstance(ArgumentBuilder)
  }

  get $() {
    return this.parent.$
  }
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
}
