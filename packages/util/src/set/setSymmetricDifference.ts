/**
 * Calculates the symmetric difference between two sets. The symmetric difference of two sets is the set of elements that are in either of the sets, but not in their intersection.
 * @param setA The first set.
 * @template T - The type of elements in the input sets.
 * @returns A new Set containing the symmetric difference between the input sets.
 * @param setB The second set.
 * @example ```ts
 * const setA = new Set([1, 2, 3]);
 * const setB = new Set([2, 3, 4]);
 * setSymmetricDifference(setA, setB);
 * //=> Set([1, 4])
 * ```
 */
export function setSymmetricDifference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const _difference = new Set(setA)
  for (const elem of setB) {
    if (_difference.has(elem)) {
      _difference.delete(elem)
    } else {
      _difference.add(elem)
    }
  }
  return _difference
}
