import type { Comparator } from '../types/Comparator'
import { compare } from './compare'

/**
 * This sort-comparator function compares two arrays using a provided comparator function.
 * It can compare arrays of any type, as long as the comparator function can handle the type.
 * @template T - The type of the elements in the arrays.
 * @param comparator The comparator function to use for comparing elements.
 * @returns A comparator function that can be used for sorting arrays with the Array.prototype.sort method.
 * @example ```ts
 * [[1,2,3], [1,2,2], [1,1,4]].sort(compareArray((a, b) => a - b));;
 * //=> [[1,1,4], [1,2,2], [1,2,3]]
 * [1, [1,2,3], 6, 2, [0,0], [5,6], [1,[2,[3]]]].sort(compareArray((a, b) => a - b)))
 * //=> [[0,0], [1,[2,[3]]], [1,2,3], [5,6], 1, 2, 6]
 * ```
 */
export function compareArray<T>(comparator: Comparator = compare): Comparator {
  function recurse(a: T, b: T, parentLengthCompareResult?: number): number {
    if (Array.isArray(a)) {
      if (!Array.isArray(b)) return -1
      const lcres = a.length - b.length
      for (let i = 0; i < Math.min(a.length, b.length); i++) {
        const res = recurse(a[i], b[i], lcres)
        if (res !== 0) return res
      }
    } else {
      if (Array.isArray(b)) return 1
      const res = comparator(a, b)
      return res === 0 ? parentLengthCompareResult || res : res
    }
    return 0
  }
  return (a: T, b: T): number => recurse(a, b)
}
