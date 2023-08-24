/**
 * Converts a positive integer to an array of bytes.
 * @throws An error if the input is not a positive integer or exceeds 256^5.
 * @param int The positive integer to convert.
 * @example ```ts
 * intToBytes(12345);
 * //=> [ 251, 0, 48, 57 ]
 * ```
 */
export function intToBytes(int: number): number[] {
  if (!Number.isInteger(int) || int < 0) throw new Error(`input must be a positive integer. Got ${int}`)
  if (int > 1099511627776) throw new Error(`input must be less than or equal to 256^5. Got ${int}`)
  const x = int - 251
  return int < 251
    ? [int]
    : x < 256
    ? [251, x]
    : x < 65536
    ? [252, Math.floor(x / 256), x % 256]
    : x < 16777216
    ? [253, Math.floor(x / 65536), Math.floor(x / 256) % 256, x % 256]
    : x < 4294967296
    ? [254, Math.floor(x / 16777216), Math.floor(x / 65536) % 256, Math.floor(x / 256) % 256, x % 256]
    : (() => {
        const exp = Math.floor(Math.log(x) / Math.log(2)) - 32
        const bytes = [255, ...intToBytes(exp)]
        const y = Math.floor(x / Math.pow(2, exp - 11))
        for (let i = 5, d = 1099511627776; i >= 0; i--, d /= 256) {
          bytes.push(Math.floor(y / d) % 256)
        }
        return bytes
      })()
}
