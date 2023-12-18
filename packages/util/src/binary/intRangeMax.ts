import { assertThat } from '../validation/assertThat'
import { isPositiveInteger } from '../validation/numbers/isPositiveInteger'

/**
 * Calculates the maximum value of an integer range based on the sign and number of bits.
 *
 * @param sign - Specifies whether the integer is signed or unsigned.
 * @param bits - The number of bits in the integer.
 * @returns The maximum value of the integer range.
 */
export function intRangeMax(sign: 'signed' | 'unsigned', bits: number): number {
  assertThat(bits, isPositiveInteger)
  return sign === 'unsigned' ? Math.pow(2, bits) - 1 : Math.pow(2, bits - 1) - 1
}
