/**
 * Maps the keys of an object using a callback function.
 * @param object The object whose keys will be mapped.
 * @param callback The callback function that maps the keys.
 * @template T - The type of the values in the object.
 * @param - The function to get the keys of the object.
 * @returns A new object with the keys mapped.
 * @param getKeys The function that retrieves the keys of the object.
 * @example ```ts
 * const object = { a: 1, b: 2, c: 3 };
 * const callback = (key: string, value: number) => key.toUpperCase();
 * objMapKeys(object, callback);
 * //=> { A: 1, B: 2, C: 3 }
 * ```
 */
export function objMapKeys<T>(
  object: Record<string, T>,
  callback: (key: string, value: T) => string,
  getKeys: (obj: typeof object) => Iterable<string> = Object.keys,
): Record<string, T> {
  const result: Record<string, T> = {}
  for (const key of getKeys(object)) {
    result[callback(key, object[key])] = object[key]
  }
  return result
}
