import { ObjectKey } from './types/ObjectKey'

/**
 * This function attempts to retrieve a value from an object using a provided key.
 * If the key does not exist in the object, it uses a callback function to generate a default value.
 * @param obj The object from which to retrieve the value.
 * @param key The key to use when retrieving the value.
 * @param callback The function to call when the key does not exist in the object. This function should return the default value.
 * @returns The value associated with the key in the object, or the result of the callback function if the key does not exist in the object.
 * @example ```ts
 * objGetOrElse({ a: 1, b: 2 }, 'c', (key) => 3);;
 * //=> 3
 * ```
 * @typeparam V - The type of the values in the object.
 */
export function objGetOrElse<V>(obj: Record<ObjectKey, V>, key: ObjectKey, callback: (key: ObjectKey) => V): V {
  const value = obj[key]
  if (value !== undefined) return value
  return (obj[key] = callback(key))
}
