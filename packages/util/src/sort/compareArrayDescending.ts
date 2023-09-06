import type { Comparator } from './Comparator'
import { compare } from './compare'

/**
 * This descending sort-comparator function compares two arrays using a provided comparator function.
 * @see compareArray
 * @template T - The type of the elements in the arrays.
 * @param comparator The comparator function to use for comparing elements.
 */
export function compareArrayDescending<T>(comparator: Comparator = compare): Comparator {
  function recurse(a: T, b: T, parentLengthCompareResult?: number): number {
    if (Array.isArray(a)) {
      if (!Array.isArray(b)) return 1
      const lcres = b.length - a.length
      for (let i = 0; i < Math.min(a.length, b.length); i++) {
        const res = recurse(a[i], b[i], lcres)
        if (res !== 0) return res
      }
    } else if (Array.isArray(b)) {
      return -1
    } else {
      const res = comparator(b, a)
      return res === 0 ? parentLengthCompareResult || res : res
    }
    return 0
  }
  return (a: T, b: T): number => recurse(a, b)
}
