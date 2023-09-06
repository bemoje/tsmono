import { ObjectKey } from './types/ObjectKey'

/**
 * Returns an iterable of the values of the given object.
 * @remarks This function uses the `Object.values()` method to get all the values of the object and then yields them one by one.
 * @typeparam V - The type of the values in the object.
 * @returns An iterable that yields all the values of the given object.
 * @param obj The object whose values should be returned.
 * @example ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * const values = objValues(obj);
 * for (const value of values) {
 *   //=> {value}
 * }
 * // Output:
 * // 1
 * // 2
 * // 3
 * ```
 */
export function* objValues<V>(obj: Record<ObjectKey, V>): Iterable<V> {
  yield* Object.values(obj)
}
