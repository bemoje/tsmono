import { colToLetter } from './colToLetter'

/**
 * Converts a column and row index to A1 notation.
 * @param CR An array of two numbers where the first number is the column index and the second number is the row index.
 * @param zeroIndexed A boolean indicating whether the column and row indexes are zero-based. Defaults to false.
 * @throws If the length of the CR array is not 2.
 * @throws If the row index is not an integer.
 * @throws If the row index is less than 1.
 * @returns The A1 notation of the column and row index.
 * @example ```ts
 * colRowToA1([3, 5]);;
 * //=> 'D5'
 * colRowToA1([3, 5], true);;
 * //=> 'C5'
 * ```
 */
export function colRowToA1(CR: number[], zeroIndexed = false): string {
  if (CR.length !== 2) throw new Error(`Expected CR to to be length 2. Got: ${CR.length}`)
  if (!Number.isInteger(CR[1])) throw new Error(`Expected row to be an integer. Got: ${CR[1]}`)
  if (CR[1] < 1) throw new Error(`Expected row to be greater than zero. Got: ${CR[1]}`)
  return colToLetter(CR[0], zeroIndexed) + CR[1].toString()
}
