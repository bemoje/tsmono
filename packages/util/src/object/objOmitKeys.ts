import { Any } from '../types/Any'
import { ObjectKey } from '../types/ObjectKey'
import { objFilter } from './objFilter'

/**
 * Deletes specified keys from an object. This function takes an object and an array of keys to be deleted from the object. It returns a new object with the specified keys removed.
 * @param obj The object from which keys are to be deleted.
 * @template V - The type of the values in the object.
 * @returns A new object with the specified keys deleted.
 * @param keys The keys to be deleted from the object.
 * @example ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * objOmitKeys(obj, 'a', 'c');
 * //=> { b: 2 }
 * ```
 */
export function objOmitKeys<O extends Record<ObjectKey, Any>>(obj: O, ...keys: ObjectKey[]) {
  return objFilter<O>(obj, (_, key) => {
    return !keys.includes(key)
  })
}
