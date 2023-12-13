import type { ObjectKey } from '../types/ObjectKey'
import { objUpdatePropertyDescriptors } from './objUpdatePropertyDescriptors'

/**
 * Sets the specified properties of an object as non-enumerable.
 * @remarks This function modifies the original object by setting the specified properties as non-enumerable.
 * If the object or any of the property names are not valid, it throws an error.
 * @param object The object whose properties are to be set as non-enumerable.
 * @param properties The names of the properties to be set as non-enumerable.
 * @throws Will throw an error if any of the specified properties do not exist on the object.
 * @example ```ts
 * setNonEnumerable({ a: 1, b: 2, c: 3 }, 'a', 'b');
 * Object.keys({ a: 1, b: 2, c: 3 });;
 * //=> ['c']
 * ```
 */
export function setNonEnumerable(object: Record<ObjectKey, any>, ...properties: string[]): void {
  objUpdatePropertyDescriptors(object, properties, (descriptor) => {
    descriptor.enumerable = false
    return descriptor
  })
}
