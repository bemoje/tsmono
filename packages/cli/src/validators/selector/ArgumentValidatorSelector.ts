import { AbstractValidatorSelector } from './ValidatorSelector'
import { ArgumentBuilder } from '../../core/CommandBuilder/ArgumentBuilder'
import { arrLast } from '@bemoje/util'
import { TValidator } from '../../types/TValidator'

export class ArgumentValidatorSelector extends AbstractValidatorSelector<ArgumentBuilder> {
  custom<O>(validator: TValidator<O>) {
    arrLast(this.builder.cmd.meta.argValidators).push(validator)
    return this.builder
  }
}
