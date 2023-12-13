import { OptionBuilder } from './OptionBuilder'
import type { TValidator } from '@bemoje/util'
import { ValidatorSelector } from '../core/ValidatorSelector'

export class OptionArgumentValidatorSelector extends ValidatorSelector<OptionBuilder> {
  constructor(builder: OptionBuilder) {
    super(builder)
  }
  custom<T>(validator: TValidator<T>) {
    const name = this.builder.$.attributeName()
    const obj = this.builder.cmd.meta.optValidators
    if (!obj[name]) obj[name] = []
    obj[name].push(validator)
    return this.builder
  }
}
