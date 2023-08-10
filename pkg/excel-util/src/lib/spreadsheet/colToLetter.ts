/**
 * Converts a column number to a column letter (e.g. 1 => 'A', 27 => 'AA').
 * @param col The column number to convert. Must be a positive integer.
 * @param zeroIndexed Optional. Whether the column number is zero-indexed. Defaults to false.
 * @throws If `col` is not an integer.
 * @throws If `col` is less than 1.
 * @returns The column letter corresponding to the column number.
 * @example ```ts
 * colToLetter(1);;
 * //=> 'A'
 * colToLetter(27);;
 * //=> 'AA'
 * colToLetter(1, true);;
 * //=> 'B'
 * ```
 */
export function colToLetter(col: number, zeroIndexed = false): string {
  if (zeroIndexed) col++
  if (!Number.isInteger(col)) throw new Error(`Expected col to be an integer. Got: ${col}`)
  if (col < 1) throw new Error(`Expected col to be greater than zero. Got: ${col}`)
  let letter = ''
  let temp
  while (col > 0) {
    temp = (col - 1) % 26
    letter = String.fromCharCode(temp + 65) + letter
    col = (col - temp - 1) / 26
  }
  return letter
}
