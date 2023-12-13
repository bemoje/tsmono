/**
 * Type definition for a predicate function that operates on arrays.
 * @remarks This type is useful when you want to create a function that can be used with methods like `Array.prototype.filter`.
 * @typeparam T - The type of elements in the array.
 * @param value - The current element being processed in the array.
 * @param index - The index of the current element being processed in the array.
 * @param array - The array `ArrayPredicate` was called upon.
 * @returns A boolean indicating whether the current element passes the test.
 */
export type ArrayPredicate<T> = (value: T, index: number, array: T[]) => boolean
