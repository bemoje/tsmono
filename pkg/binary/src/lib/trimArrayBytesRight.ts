/**
 * Trims the trailing zero bytes from an array of numbers.
 * @param a The input array of numbers.
 * @example ```ts
 * const input = [1, 2, 3, 0, 0, 0];
 * trimArrayBytesRight(input);
 * //=> [1, 2, 3]
 * ```
 */
export function trimArrayBytesRight(a: number[]): number[] {
  if (a[3] === 0) {
    if (a[2] === 0) {
      if (a[1] === 0) {
        return [a[0]]
      }
      return [a[0], a[1]]
    }
    return [a[0], a[1], a[2]]
  }
  return a
}
