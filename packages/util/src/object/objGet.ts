import { ObjectKey } from './types/ObjectKey'

/**
 * Retrieves the value associated with the specified key from an object.
 * @param obj The object from which to retrieve the value.
 * @template K - The type of the keys in the object.
 * @returns The value of the specified key in the object, or `undefined` if the key does not exist.
 * @param key The key of the value to retrieve.
 * @example ```ts
 * const myObj = { name: 'John', age: 30 };
 * objGet(myObj, 'name');
 * //=> 'John'
 * objGet(myObj, 'age');
 * //=> 30
 * objGet(myObj, 'address');
 * //=> undefined
 * ```
 */
export function objGet<V>(obj: Record<ObjectKey, V>, key: ObjectKey): V | undefined {
  return obj[key]
}
