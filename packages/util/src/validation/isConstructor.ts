import { TConstructor } from '../types/TConstructor'

/**
 * Checks if the given value is a constructor.
 * @template T - The type of the value to check.
 * @param value The value to check.
 * @returns A boolean indicating whether the value is a constructor or not.
 * @example ```ts
 * isConstructor(class {}); => true
 * isConstructor(function() {}); => true
 * isConstructor(() => {}); => false
 * ```
 */
export function isConstructor(value: unknown): value is TConstructor {
  return typeof value === 'function' && !!value.prototype && value.prototype.constructor === value
}
