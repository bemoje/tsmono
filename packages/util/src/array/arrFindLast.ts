/**
 * Searches for the last element in an array that satisfies a provided testing function.
 * @typeParam T - The type of elements in the input array.
 * @param input - The array to search within.
 * @param predicate - The function to test each element for a condition.
 * @returns The last element in the array that satisfies the provided testing function. Otherwise, undefined if no elements satisfy the testing function.
 * @example const numbers = [1, 2, 3, 4, 5, 6];
 * arrFindLast(numbers, num => num % 2 === 0);
 * //=> 6
 */
export function arrFindLast<T>(input: Array<T>, predicate: (value: T) => boolean): T | undefined {
  for (let i = input.length - 1; i >= 0; i--) {
    if (predicate(input[i]) === true) {
      return input[i]
    }
  }
  return
}
