import type { ArrayPredicate } from './types/ArrayPredicate'

/**
 * Returns true if the predicate is satisfied for every element of the passed array; otherwise false.
 * @param input The array
 * @template T - The type of elements in the array.
 * @returns Returns `true` if all elements pass the predicate check, else `false`.
 * @param predicate A predicate callback function
 * @example ```ts
 * const numbers = [1, 2, 3, 4, 5];
 * const isEven = (num) => num % 2 === 0;
 * arrEvery(numbers, isEven);
 * //=> false
 * arrEvery(numbers, (num) => num > 0);
 * //=> true
 * ```
 */
export function arrEvery<T>(input: Array<T>, predicate: ArrayPredicate<T>): boolean {
  for (let i = 0, len = input.length; i < len; i++) {
    if (predicate(input[i], i, input) === false) {
      return false
    }
  }
  return true
}
