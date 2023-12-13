import { ArgumentBuilder } from '../arg/ArgumentBuilder'
import { createTypedArrayValidator } from '../util/validation/createTypedArrayValidator'
import { isInteger } from '../util/validation/numbers/isInteger'
import { isString } from '../util/validation/isString'
import { isValidNumber } from '../util/validation/numbers/isValidNumber'
import type { JsonValue } from '../util/types/JsonValue'
import { OptionBuilder } from '../opt/OptionBuilder'
import type { TValidator } from '../util/types/TValidator'

export abstract class ValidatorSelector<Builder extends OptionBuilder | ArgumentBuilder> {
  constructor(protected readonly builder: Builder) {}

  abstract custom<O>(validator: TValidator<O>): typeof this.builder

  isString() {
    return this.custom(isString)
  }
  isNumber() {
    return this.custom(isValidNumber)
  }
  isInteger() {
    return this.custom(isInteger)
  }

  isStringArray() {
    return this.arrayWhereEach(isString)
  }
  isNumberArray() {
    return this.arrayWhereEach(isValidNumber)
  }
  isIntegerArray() {
    return this.arrayWhereEach(isInteger)
  }

  arrayWhereEach<O extends JsonValue = JsonValue>(...validators: TValidator<O>[]) {
    return this.custom(createTypedArrayValidator(validators))
  }
}
