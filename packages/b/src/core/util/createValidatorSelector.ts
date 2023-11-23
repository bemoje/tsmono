import { createMixedTypeArrayValidator } from '../../validators/createMixedTypeArrayValidator'
import { createTypedArrayValidator } from '../../validators/createTypedArrayValidator'
import { isInteger } from '../../validators/isInteger'
import { isNumber } from '../../validators/isNumber'
import { isString } from '../../validators/isString'
import { JsonArray, JsonValue } from '@bemoje/util'
import { OptionBuilder } from '../CommandBuilder/OptionBuilder'
import { TConfigValidator } from '../CommandBuilder/CommandBuilder'

export function createValidatorSelector(opt: OptionBuilder) {
  const createChoice = <O extends JsonValue>(validator: TConfigValidator<O>) => {
    if (!validator.name) throw new Error('Validator must be a named function, eg. "isString"')
    return () => {
      opt.customArgValidators.push(validator)
      return opt
    }
  }

  return {
    custom: <O extends JsonValue = JsonValue>(validator: TConfigValidator<O>) => {
      return () => createChoice(validator)()
    },

    customTypedArray: <O extends JsonValue = JsonValue>(...validators: TConfigValidator<O>[]) => {
      return () => createChoice(createTypedArrayValidator(validators))()
    },

    customMixedTypeArray: <O extends JsonValue = JsonValue>(...validators: TConfigValidator<O>[]) => {
      return () => createChoice(createMixedTypeArrayValidator(validators))()
    },

    isString: createChoice(isString),
    isStringArray: createChoice(createTypedArrayValidator([isString])),

    isNumber: createChoice(isNumber),
    isNumberArray: createChoice(createTypedArrayValidator([isNumber])),

    isInteger: createChoice(isInteger),
    isIntegerArray: createChoice(createTypedArrayValidator([isInteger])),
  }
}
