/**
 * Applies a callback function to each key-value pair in an object.
 * @param object The object to iterate over.
 * @param callback The function to apply to each keyvalue pair.
 * @template T - The type of the object's properties.
 * @param - An optional function to determine the keys to iterate over. Defaults to `Object.keys`.
 * @returns The original object.
 * @param getKeys The function to retrieve the keys of the object.
 * @example ```ts
 * const myObject = { a: 1, b: 2, c: 3 };
 * objForEach(myObject, (value, key) => {
 *   //=> ${key}: ${value}
 * });
 * ```
 */
export function objForEach<T>(
  object: Record<string, T>,
  callback: (value: T, key: string) => void,
  getKeys: (obj: typeof object) => Iterable<string> = Object.keys,
): typeof object {
  for (const key of getKeys(object)) {
    callback(object[key], key)
  }
  return object
}
