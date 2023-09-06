import { ObjectKey } from './types/ObjectKey'

/**
 * Converts an object to a Map.
 * @remarks This function is useful when you need to convert an object to a Map data structure.
 * @typeparam V - The type of the values in the object.
 * @returns A new Map object populated with the [key, value] pairs from the original object.
 * @param obj The object to convert to a Map.
 * @example ```ts
 * const obj = { key1: 'value1', key2: 'value2' };
 * const map = objToMap(obj);
 * map.get('key1');
 * //=> 'value1'
 * map.get('key2');
 * //=> 'value2'
 * ```
 */
export function objToMap<V>(obj: Record<ObjectKey, V>): Map<string, V> {
  return new Map(Object.entries(obj))
}
