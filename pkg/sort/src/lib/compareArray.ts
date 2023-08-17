import type { Comparator } from '../types/Comparator'

/**
 * This function compares two arrays using a provided comparator function.
 * It can compare arrays of any type, as long as the comparator function can handle the type.
 * If the arrays are of different lengths, the shorter one is considered smaller.
 * If the arrays are of the same length, the elements are compared one by one until a difference is found.
 * If no difference is found, the arrays are considered equal.
 * @template T - The type of the elements in the arrays.
 * @param compareAt The comparator function to use for comparing elements.
 * It should take two arguments of type T and return a number:
 * - a negative number if the first argument is smaller,
 * - a positive number if the first argument is larger,
 * - and 0 if they are equal.
 * @param descending Whether to sort in descending order. Defaults to false.
 * If true, larger elements will come before smaller ones.
 * If false (the default), smaller elements will come before larger ones.
 * @returns A comparator function that can be used for sorting arrays with the Array.prototype.sort method.
 * @example ```ts
 * [[1, 2, 3], [1, 2, 2], [1, 1, 4]].sort(compareArray((a, b) => a - b));;
 * //=> [[1, 1, 4], [1, 2, 2], [1, 2, 3]]
 * ```
 */
export function compareArray<T>(compareAt: Comparator, descending = false): Comparator {
  const order = descending ? -1 : 1

  function recursiveCompare(a: T, b: T, compareParent?: number): number {
    if (Array.isArray(a)) {
      if (!Array.isArray(b)) return 1 * order
      let shortest, compare
      if (a.length > b.length) {
        shortest = a.length
        compare = 1 * order
      } else if (a.length < b.length) {
        shortest = b.length
        compare = -1 * order
      } else {
        shortest = a.length
        compare = 0
      }
      for (let i = 0, len = shortest; i < len; i++) {
        const res = recursiveCompare(a[i], b[i], compare)
        if (res !== 0) {
          return res
        }
      }
    } else {
      if (Array.isArray(b)) return -1 * order
      const res = compareAt(a, b)
      return res === 0 ? compareParent || res : res
    }
    return 0
  }

  return (a: T, b: T): number => {
    return recursiveCompare(a, b)
  }
}
