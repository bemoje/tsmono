import { ArgumentBuilder } from '../arg/ArgumentBuilder'
import { createTypedArrayValidator, isInteger, isString, isValidNumber, JsonValue, TValidator } from '@bemoje/util'
import { OptionBuilder } from '../opt/OptionBuilder'

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
