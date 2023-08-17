import { isConstructor, isPrototype } from '@bemoje/validation'

/**
 * Iterate the prototype chain of a given object.
 * @remarks This function uses the `Reflect.getPrototypeOf` method to traverse the prototype chain.
 * It also uses the `isPrototype` and `isConstructor` helper functions to determine whether
 * the given object is a prototype or a constructor function.
 * @param object The object whose prototype chain is to be iterated over.
 * @throws If the provided object is not an object or a function, a TypeError will be thrown.
 * @returns A generator that yields each prototype in the chain.
 * @example ```ts
 * class A {}
 * class B extends A {}
 * class C extends B {}
 * const instance = new C()
 * iteratePrototypeChain(C)
 * //=> [ C, B, A, Function.prototype, Object.prototype]
 * iteratePrototypeChain(C.prototype)
 * //=> [C.prototype, B.prototype, A.prototype, Object.prototype]
 * iteratePrototypeChain(instance)
 * //=> [instance, C.prototype, B.prototype, A.prototype, Object.prototype]
 * ```
 */
export function* iteratePrototypeChain(object: Record<string, any>): Generator<Record<string, any>> {
  if (
    // if the below false, then object must be an instance
    !isPrototype(object) &&
    !isConstructor(object) &&
    // the two above depend on checking that typeof object is 'object',
    // so this last check is in case of arrow functions and generator functions
    object !== Function.prototype
  ) {
    yield object
    object = object.constructor.prototype
  }
  let objectOrNull: Record<string, any> | null = object
  while (objectOrNull) {
    yield objectOrNull
    objectOrNull = Reflect.getPrototypeOf(objectOrNull)
  }
}
