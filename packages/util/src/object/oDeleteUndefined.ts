import { ObjectKey } from '../types/ObjectKey'
import { objFilter } from './objFilter'
import { TPlainObject } from '../types/TPlainObject'

/**
 * Delete all undefined own properties from an object.
 * The keys to check default to all own keys and symbols.
 * @param obj - The object to delete undefined properties from
 * @param getKeys - A function that returns the keys to check for undefined values
 */
export function oDeleteUndefined<T extends TPlainObject = TPlainObject>(
  obj: T,
  getKeys: (value: T) => ObjectKey[] = Reflect.ownKeys
) {
  return objFilter(obj, (value) => value !== undefined, getKeys)
}
