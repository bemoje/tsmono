import { intRangeMax } from './intRangeMax'
import { intRangeMin } from './intRangeMin'

/**
 * Calculates the range of an integer based on the sign and number of bits.
 *
 * @param sign - Specifies whether the integer is signed or unsigned.
 * @param bits - The number of bits in the integer.
 * @returns An array containing the minimum and maximum values of the integer range.
 */
export function intRange(sign: 'signed' | 'unsigned', bits: number): [min: number, max: number] {
  return [intRangeMin(sign, bits), intRangeMax(sign, bits)]
}
