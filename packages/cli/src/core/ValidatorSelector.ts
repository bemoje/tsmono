import { ArgumentBuilder } from '../arg/ArgumentBuilder'
import { createTypedArrayValidator } from '../validators/createTypedArrayValidator'
import { isInteger } from '../validators/isInteger'
import { isNumber } from '../validators/isNumber'
import { isString } from '../validators/isString'
import { JsonValue } from '@bemoje/util'
import { OptionBuilder } from '../opt/OptionBuilder'
import { TValidator } from '../types/TValidator'

export abstract class ValidatorSelector<Builder extends OptionBuilder | ArgumentBuilder> {
  constructor(protected readonly builder: Builder) {}

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
