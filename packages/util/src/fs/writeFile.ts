import fsp from 'fs/promises'

/**
 * Writes data to a file asynchronously.
 *
 * @param filepath - The path to the file.
 * @param data - The data to write to the file.
 * @param encoding - The encoding to use when writing the file.
 * @returns A promise that resolves when the file has been written.
 */
export async function writeFile(filepath: string, data: string, encoding: BufferEncoding = 'utf8'): Promise<void> {
  await fsp.writeFile(filepath, data, encoding)
}
