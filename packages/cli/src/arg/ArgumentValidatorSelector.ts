import { ArgumentBuilder } from './ArgumentBuilder'
import { arrLast } from '../util/array/arrLast'
import type { TValidator } from '../util/types/TValidator'
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
