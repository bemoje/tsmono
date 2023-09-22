import { assertion } from '../validation/assertion'
import { isPositiveInteger } from '../validation/numbers/isPositiveInteger'

/**
 * Calculates the minimum value of an integer range based on the sign and number of bits.
 *
 * @param sign - Specifies whether the integer is signed or unsigned.
 * @param bits - The number of bits in the integer.
 * @returns The minimum value of the integer range.
 */
export function intRangeMin(sign: 'signed' | 'unsigned', bits: number): number {
  assertion(bits, isPositiveInteger)
  return sign === 'unsigned' ? 0 : -Math.pow(2, bits - 1)
}
