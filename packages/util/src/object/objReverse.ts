import { objEntriesArray } from './objEntriesArray'
import { ObjectKey } from './types/ObjectKey'

/**
 * Reverses the order of the properties in the given object.
 * @remarks This function does not mutate the original object. It returns a new object with the properties in reverse order.
 * @param obj The object to reverse. The object's keys are of type `ObjectKey` and its values are of type `V`.
 * @returns A new object with the properties of the input object in reverse order. The returned object's keys are of type `ObjectKey` and its values are of type `V`.
 * @typeparam V - The type of the values in the input object and the returned object.
 * @example ```ts
 * objReverse({ a: 1, b: 2, c: 3 });;
 * //=> { c: 3, b: 2, a: 1 }
 * ```
 */
export function objReverse<V>(obj: Record<ObjectKey, V>): Record<ObjectKey, V> {
  return Object.fromEntries(objEntriesArray(obj).reverse())
}
