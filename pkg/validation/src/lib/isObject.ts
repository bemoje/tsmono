/**
 * Checks if the provided value is an object.
 * @template T - The type of the value to check.
 * @param value The value to check.
 * @returns A boolean indicating whether the provided value is an object.
 * @example ```ts
 * isObject({});;
 * //=> true
 * isObject(123);;
 * //=> false
 * ```
 */
export function isObject<T>(value: T): boolean {
  return value !== null && typeof value === 'object'
}
