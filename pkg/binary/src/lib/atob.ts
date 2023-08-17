/**
 * Decodes a base64 encoded string into a Buffer.
 * @param str The base64 encoded string to decode.
 * @example ```ts
 * const encodedString = 'SGVsbG8gd29ybGQ=';
 * atob(encodedString) //=> <Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64>
 * ```
 */
export function atob(str: string): Buffer {
  return Buffer.from(str, 'base64')
}
