/**
 * Deep freezes an object, making it immutable by recursively freezing all nested objects and functions.
 * @returns The same object, but deeply frozen.
 * @throws If the object is not an object or function.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze | Object.freeze}
 * @param o The object to deep freeze.
 * This function uses `Object.freeze()` to freeze the object and all its nested objects and functions.
 * @example ```ts
 * const obj = {
 *   prop1: 'value1',
 *   prop2: {
 *     nestedProp1: 'nestedValue1',
 *     nestedProp2: {
 *       deeplyNestedProp: 'deeplyNestedValue'
 *     }
 *   },
 *   prop3: () => {
 *     //=> Hello, world!
 *   }
 * }
 * const frozenObj = objDeepFreeze(obj)
 * // Attempting to modify the frozen object will throw an error
 * frozenObj.prop1 //=> 'value1'
 * frozenObj.prop2.nestedProp1 //=> 'nestedValue1'
 * frozenObj.prop2.nestedProp2.deeplyNestedProp //=> 'deeplyNestedValue'
 * frozenObj.prop3() //=> undefined
 * ```
 */
export function objDeepFreeze(o: Record<string | symbol, any>): Record<string | symbol, any> {
  for (const key of Reflect.ownKeys(o)) {
    const value = o[key]
    if ((value && typeof value === 'object') || typeof value === 'function') {
      objDeepFreeze(value)
    }
  }
  return Object.freeze(o)
}
