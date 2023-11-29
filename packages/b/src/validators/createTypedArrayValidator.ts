import {
  Any,
  assertThat,
  funSetName,
  JsonArray,
  JsonValue,
  strFirstCharToLowerCase,
  strFirstCharToUpperCase,
} from '@bemoje/util'
import { isNamedFunctionArray } from './isNamedFunctionArray'
import { TConfigValidator } from '../types/TConfigValidator'

/**
 * Creates a validator function that checks whether the input is an array where all elements are valid according to every validator provided.
 *
 * @param validators - An array of validator functions.
 * @param name - The name of the validator function. If not provided, the name will be derived from the validator functions.
 *
 * @throws TypeError - if no name is provided and not all validators are named functions.
 */
export function createTypedArrayValidator<O extends JsonValue = JsonValue>(
  validators: TConfigValidator<O>[],
  name?: string
): (array: unknown) => boolean {
  if (!name) {
    assertThat(validators, isNamedFunctionArray)
    name = strFirstCharToLowerCase(validators.map((fun) => strFirstCharToUpperCase(fun.name)).join('And') + 'Array')
  }
  return funSetName(name, function (array: unknown): boolean {
    return Array.isArray(array) && array.every((value) => validators.every((isValid) => isValid(value)))
  })
}
