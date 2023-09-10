/**
 * Encodes a Buffer object to a base64 string.
 * @param buffer The Buffer object to encode.
 * @example ```ts
 * const buffer = Buffer.from('Hello, World!', 'utf8');
 * btoa(buffer);
 * //=> "SGVsbG8sIFdvcmxkIQ=="
 * ```
 */
export function bufferToBase64(buffer: Buffer): string {
  return buffer.toString('base64')
}
