import fs from 'fs-extra'

/**
 * Reads a file and returns the file's contents.
 * Identical to fs.readFileSync, except that it uses utf8 encoding by default.
 *
 * @param filepath - The path to the file.
 * @param encoding - The encoding to use when reading the file.
 * @returns The file's contents.
 */
export function readFileSync(filepath: string, encoding: BufferEncoding = 'utf8'): string {
  return fs.readFileSync(filepath, encoding)
}
