import { ObjectKey } from './types/ObjectKey'

/**
 * Returns an iterable of all the keys in the given object.
 * @remarks This function is a part of the `utils` module.
 * @typeparam V - The type of the values in the object.
 * @returns An iterable of the object's keys.
 * @param obj The object whose keys to iterate over.
 * @example ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * const keys = objKeys(obj);
 * for (const key of keys) {
 *   //=>  //=>  //=> c
 * }
 * ```
 */
export function* objKeys<V>(obj: Record<ObjectKey, V>): Iterable<string> {
  yield* Object.keys(obj)
}
