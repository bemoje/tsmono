/**
 * Encodes a Buffer object to a base64 string.
 * @param buf The Buffer object to encode.
 * @example ```ts
 * const buffer = Buffer.from('Hello, World!', 'utf8');
 * btoa(buffer);
 * //=> "SGVsbG8sIFdvcmxkIQ=="
 * ```
 */
export function btoa(buf: Buffer): string {
  return buf.toString('base64')
}
