import type { ArrayPredicate } from './types/ArrayPredicate'

/**
 * Checks if at least one element in the array satisfies the provided predicate.
 * @param predicate The predicate function to apply to each element.
 * @template T The type of elements in the input array.
 * @returns Returns `true` if at least one element in the array passes the test implemented by the provided function, otherwise `false`.
 * @param input The array to check.
 * @example ```ts
 * const numbers = [1, 2, 3, 4, 5];
 * const isEven = (num) => num % 2 === 0;
 * arrSome(numbers, isEven);
 * //=> true
 * ```
 */
export function arrSome<T>(input: Array<T>, predicate: ArrayPredicate<T>): boolean {
  for (let i = 0, len = input.length; i < len; i++) {
    if (predicate(input[i], i, input) === true) {
      return true
    }
  }
  return false
}
