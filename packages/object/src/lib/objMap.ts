/**
 * Maps over the values of an object and returns a new object with the mapped values.
 * @param object The object to map over.
 * @param callback The mapping function to apply to each value.
 * @template T The type of the values in the input object.
 * @param An optional function to determine the keys to iterate over. Defaults to `Object.keys`.
 * @returns A new object with the same keys as the input object, but with each value transformed by the callback function.
 * @param getKeys The function used to get the keys of the object.
 * @example ```ts
 * const object = { a: 1, b: 2, c: 3 }
 * const callback = (value: number, key: string) => value * 2
 * objMap(object, callback) //=> { a: 2, b: 4, c: 6 }
 * ```
 */
export function objMap<T>(
  object: Record<string, T>,
  callback: (value: T, key: string) => T,
  getKeys: (obj: typeof object) => Iterable<string> = Object.keys,
): Record<string, T> {
  const result: Record<string, T> = {}
  for (const key of getKeys(object)) {
    result[key] = callback(object[key], key)
  }
  return result
}
