import { ObjectKey } from '../types/ObjectKey'
import { objUpdatePropertyDescriptors } from './objUpdatePropertyDescriptors'

/**
 * Sets the specified properties of an object to be writable.
 * @template T - The type of the object.
 * @param object The object whose properties are to be made writable.
 * @param propertyNames The names of the properties to be made writable.
 * @throws Will throw an error if any of the specified properties do not exist on the object.
 * @example ```ts
 * setWritable({ a: 1, b: 2 }, 'a', 'b').a = 3;;
 * //=> 3
 * setWritable({ a: 1, b: 2 }, 'a', 'b').b = 4;;
 * //=> 4
 * ```
 * @returns void
 */
export function setWritable(object: Record<ObjectKey, any>, ...properties: string[]): void {
  objUpdatePropertyDescriptors(object, properties, (descriptor) => {
    descriptor.writable = true
    return descriptor
  })
}
