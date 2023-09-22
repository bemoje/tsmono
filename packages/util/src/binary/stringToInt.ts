import type { Encoding } from 'crypto'
import { convertEncoding } from './convertEncoding'

/**
 * Converts a string to an integer using the specified encoding.
 *
 * @param str - The string to be converted to an integer.
 * @param encoding - The encoding to be used for the conversion.
 * @returns The integer representation of the input string.
 */
export function stringToInt(str: string, encoding?: Encoding): number {
  const utf = convertEncoding(str, { from: encoding, to: 'utf16le' })
  const buf = Buffer.from(utf, 'utf16le')
  const view = new DataView(new Uint8Array(buf).buffer)
  return Number(view.getBigInt64(0))
}
