/**
 * Alpha numeric comparator function (descending)
 * @param a first value to compare
 * @param b second value to compare
 * @returns A negative number if `a` is greater than `b`, a positive number if `a` is less than `b`, or 0 if they are equal.
 * @example ```ts
 * compareStringDescending('apple', 'banana');;
 * //=> 1
 * compareStringDescending('banana', 'apple');;
 * //=> -1
 * compareStringDescending('apple', 'apple');;
 * //=> 0
 * ```
 */
export function compareStringDescending(a: string, b: string): number {
  return b.localeCompare(a)
}
