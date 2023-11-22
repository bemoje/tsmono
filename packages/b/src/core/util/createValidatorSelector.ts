import { createTypedArrayValidator } from '../../parsers/createTypedArrayValidator'
import { isInteger } from '../../validators/isInteger'
import { isNumber } from '../../validators/isNumber'
import { isString } from '../../validators/isString'
import { JsonValue } from '@bemoje/util'
import { OptionBuilder } from '../CommandBuilder/OptionBuilder'
import { TConfigValidator } from '../CommandBuilder/CommandBuilder'

export function createValidatorSelector(opt: OptionBuilder) {
  const createChoice = <O extends JsonValue = JsonValue>(validator: TConfigValidator<O>) => {
    if (!validator.name) throw new Error('Validator must be a named function, eg. "isString"')
    return () => {
      opt.customArgValidator = validator
      return opt
    }
  }

  return {
    custom: <O extends JsonValue = JsonValue>(validator: TConfigValidator<O>) => {
      return () => createChoice(validator)()
    },

    string: createChoice(isString),
    stringArray: createChoice(createTypedArrayValidator([isString])),

    number: createChoice(isNumber),
    numberArray: createChoice(createTypedArrayValidator([isNumber])),

    integer: createChoice(isInteger),
    integerArray: createChoice(createTypedArrayValidator([Number.isInteger])),
  }
}
