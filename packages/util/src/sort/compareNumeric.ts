/**
 * number, bigint, boolean comparator function (ascending)
 * @param a first value to compare
 * @param b second value to compare
 * @returns A number indicating the relationship between the two numbers:
 * - `-1` if `a` is less than `b`
 * - `1` if `a` is greater than `b`
 * - `0` if `a` is equal to `b`
 * @example ```ts
 * const arr = [3n, true, -2n, false]
 * arr.sort(compareNumeric) // [-2n, false, true, 3n]
 * ```
 */
export function compareNumeric(a: number | bigint | boolean, b: number | bigint | boolean): number {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}
