import fs from 'fs-extra'

/**
 * Reads a file and returns the file's contents.
 *
 * Identical to fs.readFileSync, except that:
 * - it uses utf8 encoding by default
 * - if operation fails, returns undefined instead of throwing
 *
 * @param filepath - The path to the file.
 * @param encoding - The encoding to use when reading the file.
 * @returns The file's contents or undefined if the file does not exist.
 */
export function readFileSafeSync(filepath: string, encoding: BufferEncoding = 'utf8'): string | undefined {
  try {
    return fs.readFileSync(filepath, encoding)
  } catch (error) {
    return undefined
  }
}
