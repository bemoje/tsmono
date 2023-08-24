import { ObjectKey } from '../types/ObjectKey'

/**
 * Returns an iterable of key-value pairs from the given object.
 * @remarks This function is a part of Object Utilities.
 * @typeparam V - The type of values in the object.
 * @returns An iterable of tuples where each tuple is a key-value pair from the object.
 * @param obj The object to iterate over.
 * @example ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * for (const [key, value] of objEntries(obj)) {
 *   //=> a  //=> b  //=> c 3
 * }
 * ```
 */
export function* objEntries<V>(obj: Record<ObjectKey, V>): Iterable<[string, V]> {
  yield* Object.entries(obj)
}
