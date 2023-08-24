/**
 * Reduces the values of an object into a single value.
 * @param object The object to reduce.
 * @param callback The function that handles the reduction logic.
 * @param accum The initial value of the accumulator.
 * @template T - The type of the values in the input object.
 * @param - An optional function to get the keys of the object. Defaults to `Object.keys`.
 * @returns The final accumulated value.
 * @param getKeys The function that retrieves the keys of the object.
 * @example ```ts
 * const object = { a: 1, b: 2, c: 3 };
 * const callback = (accum, value, key) => accum + value;
 * const initialAccum = 0;
 * objReduce(object, callback, initialAccum);
 * //=> 6
 * ```
 */
export function objReduce<T, A>(
  object: Record<string, T>,
  callback: (accum: A, value: T, key: string) => A,
  accum: A,
  getKeys: (obj: typeof object) => Iterable<string> = Object.keys,
): A {
  for (const key of getKeys(object)) {
    accum = callback(accum, object[key], key)
  }
  return accum
}
