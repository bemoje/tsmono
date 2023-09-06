/**
 * Reverses the order of entries in a Map.
 * @remarks This function creates a new Map with the entries of the original Map in reverse order.
 * The original Map is not modified.
 * @typeparam K - The type of the keys in the Map.
 * @typeparam V - The type of the values in the Map.
 * @param map The Map to reverse.
 * @returns A new Map with the entries of the original Map in reverse order.
 * @example ```ts
 * mapReverse(new Map([['a', 1], ['b', 2], ['c', 3]]));;
 * //=> [['c', 3], ['b', 2], ['a', 1]]
 * ```
 */
export function mapReverse<K, V>(map: Map<K, V>): Map<K, V> {
  return new Map<K, V>([...map.entries()].reverse())
}
