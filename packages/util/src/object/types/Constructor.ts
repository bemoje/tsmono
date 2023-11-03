/**
 * This type represents a constructor function. It is a function that can be called with the `new` keyword to create an instance of a certain type.
 * @template T - The type of the object that the constructor will create. Defaults to a record with string keys and any type values.
 * @param {...any[]} args - The arguments to pass to the constructor function.
 * @returns {T} - The created object.
 */
export type Constructor<T = any> = new (...args: any[]) => T
