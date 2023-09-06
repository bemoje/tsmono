import { ObjectKey } from './types/ObjectKey'

/**
 * Returns an array of key-value pairs from the given object.
 * @remarks This function is a utility for converting an object into an array of its entries.
 * Each entry is a tuple where the first element is the key and the second is the value.
 * @typeparam V - The type of the values in the object.
 * @returns An array of entries, where each entry is a tuple of a string and a value of type `V`.
 * @param obj The object to extract keyvalue pairs from.
 * @example ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * objEntriesArray(obj);
 * //=> [['a', 1], ['b', 2], ['c', 3]]
 * ```
 */
export function objEntriesArray<V>(obj: Record<ObjectKey, V>): Array<[string, V]> {
  return Array.from(Object.entries(obj))
}
