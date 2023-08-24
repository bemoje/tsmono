/**
 * Checks if the given value is a prototype.
 * @template T - The type of the value to check.
 * @param value The value to check.
 * @returns A boolean indicating whether the value is a prototype.
 * @example ```ts
 * isPrototype({});;
 * //=> false
 * isPrototype(Object.getPrototypeOf({}));;
 * //=> true
 * ```
 */
export function isPrototype<T>(value: T): boolean {
  if (value === null || typeof value !== 'object') return false
  if (!('constructor' in value)) return false
  return value.constructor.prototype === value
}
