import fs from 'fs-extra'

/**
 * Reads a file and returns the file's contents.
 *
 * Identical to @see fs.promises.readFile, except that does not use an encoding.
 *
 * @param filepath - The path to the file.
 */
export function readFileBuffer(filepath: string): Promise<Buffer>

/**
 * Reads a file and returns the file's contents.
 *
 * Identical to @see fs.readFile (with callback), except that does not use an encoding.
 *
 * @param filepath - The path to the file.
 * @param callback - An optional async callback.
 */
export function readFileBuffer(
  filepath: string,
  callback?: (err: NodeJS.ErrnoException | null, data: Buffer) => void
): void

/**
 * Reads a file and returns the file's contents.
 *
 * Uses no encoding, but otherwise identical to:
 * - @see fs.readFile if a callback is passed
 * - @see fs.promises.readFile is no callback is passed
 *
 * @param filepath - The path to the file.
 * @param callback - An optional async callback.
 */
export function readFileBuffer(
  filepath: string,
  callback?: (err: NodeJS.ErrnoException | null, data: Buffer) => void
): Promise<Buffer> | void {
  return callback ? fs.readFile(filepath, null, callback) : fs.readFile(filepath)
}
