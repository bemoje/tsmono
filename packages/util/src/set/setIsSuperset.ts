/**
 * Checks if a given set is a superset of another set. This function iterates over each element in the `subset` set and checks if it exists in the `set` set. If any element in the `subset` set does not exist in the `set` set, the function returns `false`. Otherwise, it returns `true`.
 * @param set The set to check if it is a superset.
 * @remarks This function will return true if all elements of the subset are found in the set, otherwise it will return false.
 * @typeparam T - The type of elements in the set.
 * @returns A boolean indicating whether the set is a superset of the subset.
 * @param subset The set to check if it is a subset.
 * @example ```ts
 * const set1 = new Set([1, 2, 3, 4]);
 * const set2 = new Set([2, 4]);
 * setIsSuperset(set1, set2);
 * //=> true
 * ```
 */
export function setIsSuperset<T>(set: Set<T>, subset: Set<T>): boolean {
  for (const elem of subset) {
    if (!set.has(elem)) {
      return false
    }
  }
  return true
}
