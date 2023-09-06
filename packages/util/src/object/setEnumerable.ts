import { objUpdatePropertyDescriptors } from './objUpdatePropertyDescriptors'
import { ObjectKey } from './types/ObjectKey'

/**
 * Sets the enumerable property of the specified properties of an object to true.
 * @template T - The type of the object.
 * @param object The object whose properties' enumerable property will be set to true.
 * @param propertyNames The names of the properties to be set enumerable.
 * @returns void
 * @example ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * setEnumerable(obj, 'a', 'b');
 * Object.keys(obj);;
 * //=> ['a', 'b']
 * ```
 * @remarks This function uses `Object.defineProperty` to set the enumerable property.
 * @throws Will throw an error if any of the specified properties do not exist on the object.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty | Object.defineProperty}
 */
export function setEnumerable(object: Record<ObjectKey, any>, ...properties: string[]): void {
  objUpdatePropertyDescriptors(object, properties, (descriptor) => {
    descriptor.enumerable = true
    return descriptor
  })
}
