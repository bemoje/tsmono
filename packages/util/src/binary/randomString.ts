import { type Encoding } from 'crypto'
import { convertEncoding } from './convertEncoding'
import { randomInt } from './randomInt'

/**
 * Generates a random string based on randomly generated integers encoded as a string.
 * @param bits - The number of bits to generate.
 * @param encoding - The encoding to use for the output string.
 * @returns A random string.
 */
export function randomString(bits = 32, encoding: Encoding = 'base64url'): string {
  if (!bits) return ''
  const ints = new Array(Math.floor(bits / 32)).fill(0).map(() => randomInt('unsigned', 32))
  if (bits % 32 > 0) ints.push(randomInt('unsigned', bits % 32))
  const hex = ints.map((n) => n.toString(16).padStart(8, '0')).join('')
  return convertEncoding(hex, { from: 'hex', to: encoding })
}
