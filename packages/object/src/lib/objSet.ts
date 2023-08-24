import { ObjectKey } from '../types/ObjectKey'

/**
 * Sets a value for a key in an object and returns the value.
 * @template ObjectKey - The type of the keys in the object.
 * @template V - The type of the values in the object.
 * @param obj The object in which to set the value.
 * @param key The key for which to set the value.
 * @param value The value to set.
 * @returns The value that was set.
 * @example ```ts
 * objSet({ a: 1, b: 2 }, 'a', 3);;
 * //=> { a: 3, b: 2 }
 * ```
 */
export function objSet<V>(obj: Record<ObjectKey, V>, key: ObjectKey, value: V): V {
  return (obj[key] = value)
}
