/**
 * Returns a new set that contains all elements of the first set that are not in the second set.
 * @template T - The type of elements in the set.
 * @param set1 The first set.
 * @param set2 The second set.
 * @returns A new set that contains all elements of the first set that are not in the second set.
 * @example ```ts
 * new Set([1, 2, 3, 4]);;
 * //=> Set {1, 2, 3, 4}
 * new Set([3, 4, 5, 6]);;
 * //=> Set {3, 4, 5, 6}
 * setDifference(new Set([1, 2, 3, 4]), new Set([3, 4, 5, 6]));;
 * //=> Set {1, 2}
 * ```
 */
export function setDifference<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  const result = new Set(set1)
  for (const elem of set2) {
    result.delete(elem)
  }
  return result
}
