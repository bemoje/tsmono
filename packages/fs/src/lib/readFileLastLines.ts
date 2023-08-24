import readLastLines from 'read-last-lines'

/**
 * Read the last n lines of a file.
 * @param filepath The path to the file.
 * @param n The number of lines to read.
 * @example await readLastLines.read('path/to/file.log', 50)
 */
export async function readFileLastLines(filepath: string, n: number) {
  return await readLastLines.read(filepath, n, 'utf8')
}
