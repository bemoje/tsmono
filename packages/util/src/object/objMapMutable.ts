/**
 * Applies a callback function to each key-value pair in an object and mutates the object.
 * @param object The object to be mapped.
 * @param callback The callback function to apply to each valuekey pair.
 * @template T - The type of the properties in the object.
 * @param - An optional function to determine the keys to be iterated over.
 * @returns The mutated object.
 * @param getKeys The function used to get the keys of the object.
 * @example ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * const callback = (value: number, key: string) => value * 2;
 * objMapMutable(obj, callback);
 * //=> { a: 2, b: 4, c: 6 }
 * ```
 */
export function objMapMutable<T>(
  object: Record<string, T>,
  callback: (value: T, key: string) => T,
  getKeys: (obj: typeof object) => Iterable<string> = Object.keys,
): typeof object {
  for (const key of getKeys(object)) {
    object[key] = callback(object[key], key)
  }
  return object
}
