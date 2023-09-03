/**
 * This function sets the name of a function and returns the function with the new name.
 * @template T - The type of the function.
 * @param name The new name to be set for the function.
 * @param fun The function whose name is to be set.
 * @returns The function with the new name.
 * @example ```ts
 * const myFun = () => 'Hello World';
 * funSetName('newFun', myFun).name;;
 * //=> 'newFun'
 * ```
 */
export function funSetName<T>(name: string, fun: T): T {
  Object.defineProperty(fun, 'name', { value: name, configurable: true, writable: true, enumerable: false })
  return fun
}
