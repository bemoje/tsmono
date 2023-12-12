import { ArgumentBuilder } from './ArgumentBuilder'
import { arrLast, TValidator } from '@bemoje/util'
import { ValidatorSelector } from '../core/ValidatorSelector'

export class ArgumentValidatorSelector extends ValidatorSelector<ArgumentBuilder> {
  constructor(builder: ArgumentBuilder) {
    super(builder)
  }
  custom<O>(validator: TValidator<O>) {
    arrLast(this.builder.cmd.meta.argValidators).push(validator)
    return this.builder
  }
}
