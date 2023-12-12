import { countInstance } from '../core/counter'
import { OptionBuilder } from './OptionBuilder'
import { TValidator } from '@bemoje/util'
import { ValidatorSelector } from '../core/ValidatorSelector'

export class OptionArgumentValidatorSelector extends ValidatorSelector<OptionBuilder> {
  constructor(builder: OptionBuilder) {
    super(builder)
    countInstance(OptionArgumentValidatorSelector)
  }
  custom<O>(validator: TValidator<O>) {
    const name = this.builder.$.attributeName()
    const obj = this.builder.cmd.meta.optValidators
    if (!obj[name]) obj[name] = []
    obj[name].push(validator)
    return this.builder
  }
}
