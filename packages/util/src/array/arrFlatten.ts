import type { NestedArray } from './types/NestedArray'

/**
 * Flattens the passed array recursively to a specified depth. Immutable.
 * @param input the array to flatten
 * @template T - The type of the elements in the input array.
 * @param - The maximum depth to flatten. Defaults to the maximum safe integer.
 * @returns The flattened array.
 * @throws If the input is not an array.
 * @param maxDepth the maximum recursive flattening depth.
 * @example ```ts
 * const nestedArray = [[1, 2], [3, [4, 5]], [6]];
 * arrFlatten(nestedArray, 1);
 * //=> [1, 2, 3, [4, 5], 6]
 * ```
 */
export function arrFlatten<T>(input: NestedArray<T>, maxDepth = Number.MAX_SAFE_INTEGER): Array<T> {
  const accum: T[] = []
  function recurse(arr: NestedArray<T>, depth: number) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && depth < maxDepth) {
        recurse(arr[i] as T[], depth + 1)
      } else {
        accum.push(arr[i] as T)
      }
    }
  }
  recurse(input, 0)
  return accum
}
