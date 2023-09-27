import fs from 'fs-extra'

/**
 * Reads a file and returns the file's contents.
 *
 * Identical to fs.promises.readFile, except that:
 * - it uses utf8 encoding by default
 * - if operation fails, returns undefined instead of throwing
 *
 * @param filepath - The path to the file.
 * @param encoding - The encoding to use when reading the file.
 * @returns A promise that resolves with the file's contents or undefined if the file does not exist.
 */
export async function readFileSafe(filepath: string, encoding: BufferEncoding = 'utf8'): Promise<string | undefined> {
  try {
    return await fs.readFile(filepath, encoding)
  } catch (error) {
    return undefined
  }
}
