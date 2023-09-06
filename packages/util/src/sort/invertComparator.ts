/**
 * This function inverts the order of comparison of a sort-comparator function.
 * @template T - The type of the elements that the comparator function compares.
 * @param comparator - A comparator function that takes two arguments of type T and returns a number.
 * The comparator function should return a negative number if the first argument is less than the second,
 * zero if they are equal, and a positive number if the first argument is greater than the second.
 * @returns - A new comparator function that takes two arguments of type T and returns a number.
 * This function will return a negative number if the first argument is greater than the second,
 * zero if they are equal, and a positive number if the first argument is less than the second.
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const comparator = (a, b) => a - b;
 * const invertedComparator = invertComparator(comparator);
 * numbers.sort(invertedComparator); // [5, 4, 3, 2, 1]
 */
export function invertComparator<T>(comparator: (a: T, b: T) => number): (a: T, b: T) => number {
  return (a: T, b: T) => comparator(b, a)
}
