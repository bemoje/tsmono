import fs from 'fs'

/**
 * Reads a file synchronously and returns the file's contents.
 *
 * @param filepath - The path to the file.
 * @param encoding - The encoding to use when reading the file.
 * @returns The file's contents.
 */
export function readFileSync(filepath: string, encoding: BufferEncoding = 'utf8'): string {
  return fs.readFileSync(filepath, encoding)
}
