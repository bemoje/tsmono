/**
 * Decodes a base64 encoded string into a Buffer.
 * @param base64 The base64 encoded string to decode.
 * @example ```ts
 * const encodedString = 'SGVsbG8gd29ybGQ=';
 * atob(encodedString) //=> <Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64>
 * ```
 */
export function base64ToBuffer(base64: string): Buffer {
  return Buffer.from(base64, 'base64')
}
