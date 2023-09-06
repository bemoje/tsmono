/**
 * Updates the value for the given key in the map using the provided function.
 * If the key does not exist in the map, the function will be called with `undefined` as the value.
 * @template K - The type of the keys in the map.
 * @param map - The map to update.
 * @param key - The key of the value to update.
 * @param fun - The function to use to update the value.
 * This function takes the current value (or `undefined` if the key does not exist) and the key as arguments,
 * and should return the new value.
 * @returns - The new value for the key.
 * @example ```ts
 * const map = new Map<string, number>()
 * map.set('a', 1)
 * mapUpdate(map, 'a', (value, key) => value !== undefined ? value + 1 : 0)
 * map.get('a')
 * //=> 2
 * ```
 */
export function mapUpdate<K, V>(map: Map<K, V>, key: K, fun: (value: V | undefined, key: K) => V): V {
  const value = fun(map.get(key), key)
  map.set(key, value)
  return value
}
