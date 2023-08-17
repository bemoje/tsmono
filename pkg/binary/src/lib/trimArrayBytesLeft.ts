/**
 * Trims the left side of an array of bytes by removing leading zeros.
 * @param a The array of bytes to trim.
 * @example ```ts
 * const input = [0, 0, 0, 1, 2, 3];
 * trimArrayBytesLeft(input);
 * //=> [1, 2, 3]
 * ```
 */
export function trimArrayBytesLeft(a: number[]): number[] {
  if (a[0] === 0) {
    if (a[1] === 0) {
      if (a[2] === 0) {
        return [a[3]]
      }
      return [a[2], a[3]]
    }
    return [a[1], a[2], a[3]]
  }
  return a
}
