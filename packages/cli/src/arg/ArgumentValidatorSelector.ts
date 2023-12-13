import { ArgumentBuilder } from './ArgumentBuilder'
import { arrLast } from '@bemoje/util'
import type { TValidator } from '@bemoje/util'
import { ValidatorSelector } from '../core/ValidatorSelector'

export class ArgumentValidatorSelector extends ValidatorSelector<ArgumentBuilder> {
  constructor(builder: ArgumentBuilder) {
    super(builder)
  }
  custom<T>(validator: TValidator<T>) {
    arrLast(this.builder.cmd.meta.argValidators).push(validator)
    return this.builder
  }
}
