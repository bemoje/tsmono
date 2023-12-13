import type { TFunction } from '../types/TFunction'

/**
 * Checks if the given value is a function.
 *
 * @example ```ts
 * isFunction(class {}); //=> true
 * isFunction(function () {}); //=> true
 * isFunction(() => {}); //=> true
 * ```
 */
export function isFunction(value: unknown): value is TFunction {
  return typeof value === 'function' && value !== Function.prototype
}
