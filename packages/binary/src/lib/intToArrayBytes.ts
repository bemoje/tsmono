/**
 * Converts an integer to an array of bytes.
 * @param int The integer to convert.
 * @example ```ts
 * intToArrayBytes(1234567890);
 * //=> [210, 2, 150, 73]
 * ```
 */
export function intToArrayBytes(int: number): number[] {
  if (int < 256) return [int]
  const bin = new Uint8Array(new Uint32Array([int]).buffer)
  if (int < 65536) return [bin[0], bin[1]]
  if (int < 16777216) return [bin[0], bin[1], bin[2]]
  if (int < 4294967296) return [bin[0], bin[1], bin[2], bin[3]]
  return [256, 256, 256, 256]
}
