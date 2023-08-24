/**
 * number, bigint, boolean comparator function (descending)
 * @remarks This function is used for sorting arrays of numbers in descending order.
 * @param a first value to compare
 * @param b second value to compare
 * @returns A number indicating the sort order. -1 if `a` is greater than `b`, 1 if `a` is less than `b`, 0 if they are equal.
 * @example ```ts
 * const arr = [true, 3n, -2n, false]
 * arr.sort(compareNumericDescending) // [3n, true, false, -2n]
 * ```
 */
export function compareNumericDescending(a: number | bigint | boolean, b: number | bigint | boolean): number {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}
