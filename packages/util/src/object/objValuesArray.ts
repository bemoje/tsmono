import { ObjectKey } from './types/ObjectKey'

/**
 * Returns an array containing the values of the given object.
 * @remarks This function is a part of Object Utilities.
 * @typeparam V - The type of values in the object.
 * @returns An array of the values of the object.
 * @param obj The object whose values will be extracted.
 * @example ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * objValuesArray(obj);
 * //=> [1, 2, 3]
 * ```
 */
export function objValuesArray<V>(obj: Record<ObjectKey, V>): Array<V> {
  return Array.from(Object.values(obj))
}
