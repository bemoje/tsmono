/**
 * Pads an array of bytes on the right with zeros to ensure it has a length of 4.
 * @param a The array of bytes to pad.
 * @example ```ts
 * padArrayBytesRight([1, 2, 3]);
 * //=> [1, 2, 3, 0]
 * padArrayBytesRight([1]);
 * //=> [1, 0, 0, 0]
 * ```
 */
export function padArrayBytesRight(a: number[]): number[] {
  if (!a.length) return [0, 0, 0, 0]
  const l = a.length
  return l === 4 ? a : l === 1 ? [a[0], 0, 0, 0] : l === 2 ? [a[0], a[1], 0, 0] : [a[0], a[1], a[2], 0]
}
