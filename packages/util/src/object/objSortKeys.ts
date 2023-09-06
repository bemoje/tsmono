import { ObjectKey } from './types/ObjectKey'

/**
 * Sorts the keys of an object in alphabetical order.
 * @remarks This function does not mutate the original object. It returns a new object with sorted keys.
 * @typeparam V - The type of the values in the object.
 * @returns A new object with the same values as the original, but with keys sorted in ascending order.
 * @param o The object whose keys should be sorted.
 * @example ```ts
 * const obj = { c: 1, a: 2, b: 3 };
 * objSortKeys(obj);
 * //=> { a: 2, b: 3, c: 1 }
 * ```
 */
export function objSortKeys<V>(o: Record<ObjectKey, V>): Record<ObjectKey, V> {
  return Object.fromEntries(Object.entries(o).sort((a, b) => a[0].localeCompare(b[0])))
}
