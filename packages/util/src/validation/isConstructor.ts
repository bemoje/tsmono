/**
 * Checks if the given value is a constructor.
 * @template T - The type of the value to check.
 * @param value The value to check.
 * @returns A boolean indicating whether the value is a constructor or not.
 * @example ```ts
 * class MyClass {}
 * isConstructor(MyClass);;
 * //=> true
 * isConstructor('Not a class');;
 * //=> false
 * ```
 */
export function isConstructor<T>(value: T): boolean {
  return typeof value === 'function' && !!value.prototype && value.prototype.constructor === value
}
