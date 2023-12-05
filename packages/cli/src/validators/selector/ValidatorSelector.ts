import { ArgumentBuilder } from '../../core/CommandBuilder/ArgumentBuilder'
import { Base } from '../../core/CommandBuilder/Base'
import { createTypedArrayValidator } from '../createTypedArrayValidator'
import { isInteger } from '../isInteger'
import { isNumber } from '../isNumber'
import { isString } from '../isString'
import { JsonValue } from '@bemoje/util'
import { OptionBuilder } from '../../core/CommandBuilder/OptionBuilder'
import { TValidator } from '../../types/TValidator'

export abstract class AbstractValidatorSelector<Builder extends OptionBuilder | ArgumentBuilder> extends Base {
  constructor(protected readonly builder: Builder) {
    super()
  }

  abstract custom<O>(validator: TValidator<O>): typeof this.builder

  isString() {
    return this.custom(isString)
  }
  isNumber() {
    return this.custom(isNumber)
  }
  isInteger() {
    return this.custom(isInteger)
  }

  isStringArray() {
    return this.arrayWhereEach(isString)
  }
  isNumberArray() {
    return this.arrayWhereEach(isNumber)
  }
  isIntegerArray() {
    return this.arrayWhereEach(isInteger)
  }

  arrayWhereEach<O extends JsonValue = JsonValue>(...validators: TValidator<O>[]) {
    return this.custom(createTypedArrayValidator(validators))
  }
}
