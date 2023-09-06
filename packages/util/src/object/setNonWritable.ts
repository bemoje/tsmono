import { objUpdatePropertyDescriptors } from './objUpdatePropertyDescriptors'
import { ObjectKey } from './types/ObjectKey'

/**
 * Sets the specified properties of an object to be non-writable.
 * @template T - The type of the object.
 * @param object The object whose properties are to be made non-writable.
 * @param properties The names of the properties to be made non-writable.
 * @throws Will throw an error if any of the specified properties do not exist on the object.
 * @example ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * setNonWritable(obj, 'a', 'b');
 * obj;;
 * //=> { a: 1, b: 2, c: 3 }
 * obj.a = 10;;
 * //=> Throws an error
 * obj.b = 20;;
 * //=> Throws an error
 * obj.c = 30;;
 * //=> Works fine
 * ```
 */
export function setNonWritable(object: Record<ObjectKey, any>, ...properties: string[]): void {
  objUpdatePropertyDescriptors(object, properties, (descriptor) => {
    descriptor.writable = false
    return descriptor
  })
}
