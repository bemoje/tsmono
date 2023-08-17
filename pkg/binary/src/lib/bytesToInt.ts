/**
 * Converts an array of bytes to an integer.
 * @throws If the bytes are invalid or the resulting integer is greater than 256^5.
 * @param bytes The array of bytes to convert.
 * @example ```ts
 * const bytes = [255, 1, 2, 3, 4, 5];
 * bytesToInt(bytes);
 * //=> 1099511627776
 * ```
 */
export function bytesToInt(bytes: number[]): number {
  return bytes.length === 1 && bytes[0] < 251
    ? bytes[0]
    : bytes.length === 2 && bytes[0] === 251
    ? 251 + bytes[1]
    : bytes.length === 3 && bytes[0] === 252
    ? 251 + 256 * bytes[1] + bytes[2]
    : bytes.length === 4 && bytes[0] === 253
    ? 251 + 65536 * bytes[1] + 256 * bytes[2] + bytes[3]
    : bytes.length === 5 && bytes[0] === 254
    ? 251 + 16777216 * bytes[1] + 65536 * bytes[2] + 256 * bytes[3] + bytes[4]
    : bytes.length > 5 && bytes[0] === 255
    ? (() => {
        let m = 0
        let x = 1
        const pivot = Math.max(2, bytes.length - 6)
        for (let i = bytes.length - 1; i >= pivot; i--) {
          m += x * bytes[i]
          x *= 256
        }
        const n =
          bytes[1] + 32 < 251
            ? bytesToInt([bytes[1] + 32]) - 11
            : bytes[0] === 255 && bytes[1] < 251
            ? bytes[1] + 21
            : pivot === 3
            ? bytesToInt([bytes[1], bytes[2] + 21])
            : pivot === 4
            ? bytesToInt([bytes[1], bytes[2], bytes[3] + 21])
            : 0
        const int = 251 + m / Math.pow(2, 32 - n)
        if (!Number.isInteger(int)) throw new Error(`Invalid bytes. Got [${bytes.join(', ')}] = ${int}`)
        if (int > 1099511627776)
          throw new Error(
            `Bytes must correspond to an integer less than or equal to 256^5. Got [${bytes.join(', ')}] = ${int}`,
          )
        return int
      })()
    : (() => {
        throw new Error(`Invalid first byte. Got length: ${bytes.length}, and bytes: [${bytes.join(', ')}]`)
      })()
}
