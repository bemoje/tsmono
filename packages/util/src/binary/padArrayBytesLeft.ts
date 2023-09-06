/**
 * Pads an array of bytes on the left side with zeros to make it a fixed length of 4 bytes.
 * @param a The array of bytes to pad.
 * @example ```ts
 * padArrayBytesLeft([1, 2, 3]);
 * //=> [0, 1, 2, 3]
 * padArrayBytesLeft([1]);
 * //=> [0, 0, 0, 1]
 * ```
 */
export function padArrayBytesLeft(a: number[]): number[] {
  if (!a.length) return [0, 0, 0, 0]
  const l = a.length
  return l === 4 ? a : l === 1 ? [0, 0, 0, a[0]] : l === 2 ? [0, 0, a[0], a[1]] : [0, a[0], a[1], a[2]]
}
