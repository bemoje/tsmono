import fsp from 'fs/promises'

/**
 * Reads a file asynchronously and returns the file's contents.
 *
 * @param filepath - The path to the file.
 * @param encoding - The encoding to use when reading the file.
 * @returns A promise that resolves with the file's contents.
 */
export async function readFile(filepath: string, encoding: BufferEncoding = 'utf8'): Promise<string> {
  return await fsp.readFile(filepath, encoding)
}
