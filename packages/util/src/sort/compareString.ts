/**
 * Alpha numeric comparator function (ascending)
 * @param a first value to compare
 * @param b second value to compare
 * @returns A number indicating whether a reference string comes before or after or is the same as the given string in sort order.
 * @example ```ts
 * compareString("apple", "banana");;
 * //=> -1
 * compareString("banana", "apple");;
 * //=> 1
 * compareString("apple", "apple");;
 * //=> 0
 * ```
 */
export function compareString(a: string, b: string): number {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}
