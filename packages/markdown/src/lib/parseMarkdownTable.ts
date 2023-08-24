/**
 * Parses a markdown table into a 2D array of strings.
 * @remarks This function will remove leading and trailing pipes from each row, as well as any empty lines.
 * It will also remove the separator line (the second line in a standard markdown table).
 * Each cell's content will be trimmed of leading and trailing whitespace.
 * @returns A 2D array of strings, where each inner array represents a row of the table, and each string within that array represents a cell.
 * @param string The markdown table to parse.
 * @example ```ts
 * | Header 1 | Header 2 |
 * |----------|----------|
 * | Cell 1   | Cell 2   |
 * | Cell 3   | Cell 4   |
 * `);
 * //=> [['Header 1', 'Header 2'], ['Cell 1', 'Cell 2'], ['Cell 3', 'Cell 4']]
 * ```
 */
export function parseMarkdownTable(string: string): string[][] {
  return string
    .trim() // allow leading/trailing whitespace
    .split('\n')
    .map((s) => s.trim())
    .filter((s, i) => !!s) // remove empty lines
    .filter((s, i) => i !== 1) // remove the separator line
    .map((row) => {
      return row
        .trim()
        .replace(/^\|/, '') // remove leading pipe
        .replace(/\|$/, '') // remove trailing pipe
        .split('|')
        .map((cell) => cell.trim())
    })
}
