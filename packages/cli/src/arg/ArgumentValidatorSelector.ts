import { ArgumentBuilder } from './ArgumentBuilder'
import { arrLast } from '@bemoje/util'
import { TValidator } from '../types/TValidator'
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
