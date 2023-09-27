import fs from 'fs-extra'

/**
 * Reads a file and returns the file's contents.
 *
 * Identical to @see fs.readFile, except that:
 * - it uses no encoding by default
 * - if operation fails, returns undefined instead of throwing
 *
 * @param filepath - The path to the file.
 */
export async function readFileBufferSafe(filepath: string): Promise<Buffer | undefined> {
  try {
    return fs.readFile(filepath)
  } catch (error) {
    return undefined
  }
}
