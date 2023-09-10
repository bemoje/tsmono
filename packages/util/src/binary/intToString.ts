import type { Encoding } from 'crypto'
import { convertEncoding } from './convertEncoding'

/**
 * Converts an integer to a string using the specified encoding.
 *
 * @param int - The integer to be converted to a string.
 * @param encoding - The encoding to be used for the conversion.
 * @returns The string representation of the input integer.
 */
export function intToString(int: number, encoding?: Encoding): string {
  const buffer = new ArrayBuffer(8)
  new DataView(buffer).setBigInt64(0, BigInt(int))
  const utf = Buffer.from(buffer).toString('utf16le')
  return convertEncoding(utf, { from: 'utf16le', to: encoding })
}
