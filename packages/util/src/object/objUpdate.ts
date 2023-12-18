import { ObjectKey } from '../types/ObjectKey'

/**
 * Updates the value of a specific key in an object using a callback function.
 * @template V - The type of the values in the object.
 * @param obj The object to update.
 * @param key The key of the value to update.
 * @param callback The function to generate the new value. It receives the current value and the key as arguments.
 * @returns The new value.
 * @example ```ts
 * objUpdate({ a: 1, b: 2 }, 'a', (value, key) => value + 1);;
 * //=> { a: 2, b: 2 }
 * ```
 */
export function objUpdate<V>(
  obj: Record<ObjectKey, V>,
  key: ObjectKey,
  callback: (value: V | undefined, key: ObjectKey) => V
): V {
  return (obj[key] = callback(obj[key], key))
}
