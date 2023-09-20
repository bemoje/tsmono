import fs from 'fs'

/**
 * Reads a file synchronously and returns the file's contents. If the file does not exist, it returns undefined.
 *
 * @param filepath - The path to the file.
 * @param encoding - The encoding to use when reading the file.
 * @returns The file's contents or undefined if the file does not exist.
 */
export function readFileSafeSync(filepath: string, encoding: BufferEncoding = 'utf8'): string | void {
  try {
    return fs.readFileSync(filepath, encoding)
  } catch (error) {
    return
  }
}
