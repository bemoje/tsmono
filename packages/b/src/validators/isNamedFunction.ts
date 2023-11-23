import { TFunction } from '@bemoje/util'

/**
 * Checks if the provided value is a named function.
 */
export function isNamedFunction(func: unknown): func is TFunction {
  return typeof func === 'function' && !!func.name
}
