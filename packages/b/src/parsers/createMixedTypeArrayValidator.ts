import { funSetName, JsonRawPrimitive, strFirstCharToUpperCase } from '@bemoje/util'
import { ValidatorFunction } from '../core/ValidInputPrimitiveTypes'

/**
 * Creates a validator function for mixed-type arrays. The validator function checks if the input array matches the provided validator(s).
 * The ordering of the validator functions does not matter. If any of them pass for an element, it is considered valid.
 *
 * @param validators - An array of validator functions. Each validator function should return a boolean indicating whether the input value is valid.
 * @returns A validator function for typed arrays.
 */
export function createMixedTypeArrayValidator<InputType extends JsonRawPrimitive = JsonRawPrimitive>(
  validators: ValidatorFunction<InputType>[]
) {
  const errorMessage = `Expected mixed type array where: ${validators.join(' or ')}`
  const funcName = validators.map((fun) => strFirstCharToUpperCase(fun.name)).join('_or_') + 'Array'
  return funSetName(funcName, function (array: InputType[]) {
    if (!Array.isArray(array)) return errorMessage
    for (const elem of array) {
      let isValid = false
      for (const validator of validators) {
        if (validator(elem)) {
          isValid = true
          break
        }
      }
      if (!isValid) return errorMessage
    }
    return true
  })
}
