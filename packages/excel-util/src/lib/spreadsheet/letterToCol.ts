/**
 * Converts a column letter (e.g., A, B, C, ..., Z, AA, AB, ...) to a column number.
 * @param A The column letter to convert.
 * @param zeroIndexed Optional. If true, the function will return a zero-indexed column number. Default is false.
 * @throws Will throw an error if the input column letter is invalid.
 * @returns The column number corresponding to the input column letter.
 * @example ```ts
 * letterToCol('A');;
 * //=> 1
 * letterToCol('Z');;
 * //=> 26
 * letterToCol('AA');;
 * //=> 27
 * letterToCol('AB', true);;
 * //=> 27
 * ```
 */
export function letterToCol(A: string, zeroIndexed = false): number {
  const REGEX_VALID_A = /^[A-Z]*$/i
  A = A.toUpperCase()
  if (!REGEX_VALID_A.test(A)) throw new Error(`Invalid column letter: ${A}`)
  let col = 0
  const length = A.length
  for (let i = 0; i < length; i++) {
    col += (A.charCodeAt(i) - 64) * Math.pow(26, length - i - 1)
  }
  return col - (zeroIndexed ? 1 : 0)
}
