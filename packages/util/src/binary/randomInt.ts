import { randomIntBetween } from '../number/randomIntBetween'
import { intRange } from './intRange'

/**
 * Generates a random integer within a range based on the sign and number of bits.
 *
 * @param sign - Specifies whether the integer is signed or unsigned.
 * @param bits - The number of bits in the integer.
 * @returns A random integer within the specified range.
 */
export function randomInt(sign: 'signed' | 'unsigned', bits: number): number {
  return randomIntBetween(...intRange(sign, bits))
}
