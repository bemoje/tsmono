import { ObjectKey } from './types/ObjectKey'

/**
 * Calculates and returns the size of the given object.
 * @remarks This function uses `Object.keys(obj).length` to determine the size of the object.
 * @param obj The object whose size is to be calculated.
 * @typeparam V - The type of the values in the object.
 * @returns The size of the object.
 * @example ```ts
 * objSize({ a: 1, b: 2, c: 3 });;
 * //=> 3
 * ```
 */
export function objSize<V>(obj: Record<ObjectKey, V>): number {
  return Object.keys(obj).length
}
