import type { Encoding } from 'crypto'

/**
 * Converts the encoding of a string.
 * @param str - The string to convert.
 * @param from - The current encoding of the string.
 * @param to - The encoding to convert the string to.
 * @returns The string with the new encoding.
 */
export function convertEncoding(str: string, options: { from?: Encoding; to?: Encoding }) {
  const { from, to } = options
  if (from === to) return str
  return Buffer.from(str, from).toString(to)
}
