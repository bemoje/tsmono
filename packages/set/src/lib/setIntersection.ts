/**
 * Computes the intersection of multiple sets.
 * @typeparam T - The type of elements in the sets.
 * @returns The intersection of all sets in the array.
 * @param sets An array of sets to compute the intersection from.
 * @example ```ts
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([2, 3, 4]);
 * const set3 = new Set([3, 4, 5]);
 * setIntersection([set1, set2, set3]);
 * //=> new Set([3])
 * ```
 */
export function setIntersection<T>(sets: Array<Set<T>>): Set<T> {
  if (!sets.length) return new Set()
  const result = new Set(sets[0].values())
  for (let i = 1; i < sets.length; i++) {
    for (const value of result.values()) {
      if (!sets[i].has(value)) {
        result.delete(value)
      }
    }
  }
  return result
}
