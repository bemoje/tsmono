import { funSetName, JsonRawPrimitive, strFirstCharToUpperCase } from '@bemoje/util'
import { ValidatorFunction } from '../core/ValidInputPrimitiveTypes'

/**
 * Creates a validator function for typed arrays. The validator function checks if the input array matches the provided validators.
 * Each validator function in the validators array corresponds to a specific index in the input array.
 *
 * @param validators - An array of validator functions. Each validator function should return a boolean indicating whether the input value is valid.
 * @returns A validator function for typed arrays.
 */
export function createTypedArrayValidator<Input extends JsonRawPrimitive = JsonRawPrimitive>(
  validators: ValidatorFunction<Input>[]
) {
  const errorMessage = `Expected typed array where: ${validators.join(' then ')}`
  const funcName = validators.map((fun) => strFirstCharToUpperCase(fun.name)).join('_then_') + 'Array'
  return funSetName(funcName, function (array: Input[]) {
    if (!Array.isArray(array)) return errorMessage
    if (array.length !== validators.length) return errorMessage
    for (let i = 0; i < array.length; i++) {
      if (!validators[i](array[i])) {
        return errorMessage
      }
    }
    return true
  })
}
