/**
 * Adds multiple values to a given set.
 * @template T - The type of elements in the set.
 * @param set - The set to which values will be added.
 * @param values - The values to be added to the set.
 * @returns The updated set with the new values added.
 * @example ```ts
 * const mySet = new Set<number>();
 * setAddMany(mySet, [1, 2, 3]);
 * console.log(mySet); // Set { 1, 2, 3 }
 * ```
 */
export function setAddMany<T>(set: Set<T>, values: Iterable<T>) {
  for (const value of values) set.add(value)
  return set
}
