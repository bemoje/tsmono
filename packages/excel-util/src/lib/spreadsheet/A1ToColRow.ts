import { rexec } from '@bemoje/string'
import { letterToCol } from './letterToCol'

/**
 * Converts an A1 notation string to a column-row pair.
 * @param A1 The A1 notation string to convert.
 * @param - Whether to return zero-indexed values.
 * @param zeroIndexed Optional. If true, the returned indices will be zero-based. Default is false.
 * @returns An array where the first element is the column index and the second element is the row index.
 * @throws If the A1 string is invalid.
 * @example ```ts
 * //=> [1, 1]
 * A1ToColRow('B2', true);
 * //=> [1, 1]
 * ```
 */
export function A1ToColRow(A1: string, zeroIndexed = false): number[] {
  const REGEX_VALID_A1 = /^(?<a>[A-Z]+)(?<n>[1-9]+)$/g
  A1 = A1.toUpperCase()
  const matches = [...rexec(REGEX_VALID_A1, A1)]
  if (!matches.length) throw new Error(`Invalid A1 string: ${A1}`)
  const adjust = zeroIndexed ? 1 : 0
  return [letterToCol(matches[0].groups.a) - adjust, parseInt(matches[0].groups.n) - adjust]
}
