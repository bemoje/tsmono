import fs from 'fs-extra'

/**
 * Reads a file and returns the file's contents.
 *
 * Identical to @see fs.promises.readFile, except that it uses 'utf8' encoding by default.
 *
 * @param filepath - The path to the file.
 * @param encoding - The encoding to use when reading the file. Note that 'undefined' defaults to 'utf8'.
 */
export function readFile(filepath: string, encoding?: BufferEncoding): Promise<string>

/**
 * Reads a file and returns the file's contents.
 *
 * Identical to @see fs.readFile (with callback), except that it uses 'utf8' encoding by default.
 *
 * @param filepath - The path to the file.
 * @param encoding - The encoding to use when reading the file. Note that 'undefined' defaults to 'utf8'.
 * @param callback - An optional async callback.
 */
export function readFile(
  filepath: string,
  encoding?: BufferEncoding,
  callback?: (err: NodeJS.ErrnoException | null, data: string) => void
): void

/**
 * Reads a file and returns the file's contents.
 *
 * Defaults to 'utf8' encoding, but otherwise identical to:
 * - @see fs.readFile if a callback is passed
 * - @see fs.promises.readFile is no callback is passed
 *
 * @param filepath - The path to the file.
 * @param encoding - The encoding to use when reading the file. Note that 'undefined' defaults to 'utf8'.
 * @param callback - An optional async callback.
 */
export function readFile(
  filepath: string,
  encoding?: BufferEncoding,
  callback?: (err: NodeJS.ErrnoException | null, data: string) => void
): Promise<string> | void {
  return callback ? fs.readFile(filepath, encoding || 'utf8', callback) : fs.readFile(filepath, encoding || 'utf8')
}
