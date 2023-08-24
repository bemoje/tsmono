import { intToArrayBytes } from './intToArrayBytes'

/**
 * Converts an integer to a Buffer.
 * @param int The integer to convert.
 * @example ```ts
 * const int = 42;
 * intToBuffer(int) //=> <Buffer 00 00 00 2a>
 * ```
 */
export function intToBuffer(int: number): Buffer {
  return Buffer.from(intToArrayBytes(int))
}
