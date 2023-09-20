import fsp from 'fs/promises'

/**
 * Reads a file asynchronously and returns the file's contents. If the file does not exist, it returns undefined.
 *
 * @param filepath - The path to the file.
 * @param encoding - The encoding to use when reading the file.
 * @returns A promise that resolves with the file's contents or undefined if the file does not exist.
 */
export async function readFileSafe(filepath: string, encoding: BufferEncoding = 'utf8'): Promise<string | void> {
  try {
    return await fsp.readFile(filepath, encoding)
  } catch (error) {
    return
  }
}
