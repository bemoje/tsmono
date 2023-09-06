import { ObjectKey } from './types/ObjectKey'

/**
 * Returns an array of keys from the provided object.
 * @remarks This function is a part of Object Utilities.
 * @typeparam V - The type of values in the object.
 * @returns The array of keys of the input object.
 * @param obj The object from which to extract the keys.
 * @example ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * objKeysArray(obj);
 * //=> ['a', 'b', 'c']
 * ```
 */
export function objKeysArray<V>(obj: Record<ObjectKey, V>): string[] {
  return Array.from(Object.keys(obj))
}
