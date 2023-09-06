import { objUpdatePropertyDescriptors } from './objUpdatePropertyDescriptors'
import { ObjectKey } from './types/ObjectKey'

/**
 * Sets the specified properties of an object as non-configurable.
 * @remarks This function modifies the original object by setting the `configurable` attribute of the specified properties to `false`.
 * Once a property is made non-configurable, it can neither be deleted from the object nor changed to configurable.
 * @typeparam T - The type of the object.
 * @param object The object whose properties are to be made non-configurable.
 * @param properties The names of the properties to be made non-configurable.
 * @throws Will throw an error if any of the specified properties do not exist on the object.
 * @example ```ts
 * setNonConfigurable({ a: 1, b: 2, c: 3 }, 'a', 'b');
 * Object.getOwnPropertyDescriptor({ a: 1, b: 2, c: 3 }, 'a');;
 * //=> {value: 1, writable: true, enumerable: true, configurable: false}
 * Object.getOwnPropertyDescriptor({ a: 1, b: 2, c: 3 }, 'b');;
 * //=> {value: 2, writable: true, enumerable: true, configurable: false}
 * Object.getOwnPropertyDescriptor({ a: 1, b: 2, c: 3 }, 'c');;
 * //=> {value: 3, writable: true, enumerable: true, configurable: true}
 * ```
 */
export function setNonConfigurable(object: Record<ObjectKey, any>, ...properties: string[]): void {
  objUpdatePropertyDescriptors(object, properties, (descriptor) => {
    descriptor.configurable = false
    return descriptor
  })
}
