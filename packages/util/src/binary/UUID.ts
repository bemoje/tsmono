import type { Encoding } from 'crypto'
import { convertEncoding } from './convertEncoding'
import { randomString } from './randomString'

/**
 * Generates a UUID (Universally Unique Identifier) as a string.
 * This does not follow the ISO standards. It's just a random string with the first 32 bits being an encoded timestamp and the remaining bits being random bits.
 * https://en.wikipedia.org/wiki/Universally_unique_identifier
 * @param bits - The number of bits to generate. Minimum is 32 as this only covers the timestamp-part of the UUID.
 * @param encoding - The encoding to use for the output string. Default is 'binary'.
 * @returns A UUID as a string.
 */
export function UUID(bits = 128, encoding: Encoding = 'base64url'): string {
  if (bits < 32) throw new Error('UUID must be at least 32 bits.')
  const timestamp = convertEncoding(Date.now().toString(16), { from: 'hex', to: encoding })
  const id = randomString(bits - 32, encoding)
  return timestamp + id
}
