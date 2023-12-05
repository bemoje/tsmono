import { AbstractValidatorSelector } from './ValidatorSelector'
import { OptionBuilder } from '../../core/CommandBuilder/OptionBuilder'
import { TValidator } from '../../types/TValidator'

export class OptionArgumentValidatorSelector extends AbstractValidatorSelector<OptionBuilder> {
  custom<O>(validator: TValidator<O>) {
    const name = this.builder.$.attributeName()
    const obj = this.builder.cmd.meta.optValidators
    if (!obj[name]) obj[name] = []
    obj[name].push(validator)
    return this.builder
  }
}
