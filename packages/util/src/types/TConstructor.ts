import { Any } from './Any'

/**
 * This type represents a constructor function. It is a function that can be called with the `new` keyword to create an instance of a certain type.
 */
export type TConstructor<R = Any, A extends Any[] = Any[]> = new (...args: A) => R
