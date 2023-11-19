import { ObjectKey } from '../types/ObjectKey'
import { TPlainObject } from '../types/TPlainObject'

/**
 * Mutably filters the properties of an object based on a predicate function.
 * @param object The object to filter.
 * @param predicate The callback function used to filter the object properties.
 * @param getKeys The function used to get the keys of the object.
 * @example ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * objFilter(obj, (value, key) => value > 1);
 * //=> { b: 2, c: 3 }
 * ```
 */
export function objFilterMutable<T extends TPlainObject = TPlainObject>(
  object: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean,
  getKeys: (value: T) => ObjectKey[] = Object.keys
) {
  for (const key of getKeys(object)) {
    if (!predicate(object[key], key)) {
      delete object[key]
    }
  }
  return object
}
