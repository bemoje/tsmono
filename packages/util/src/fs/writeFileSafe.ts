import fsp from 'fs/promises'
import path from 'path'
import { createDirectory } from './createDirectory'

/**
 * Writes data to a file asynchronously. If the file does not exist, it will be created.
 *
 * @param filepath - The path to the file.
 * @param data - The data to write to the file.
 * @param encoding - The encoding to use when writing the file.
 * @returns A promise that resolves when the file has been written.
 */
export async function writeFileSafe(filepath: string, data: string, encoding: BufferEncoding = 'utf8'): Promise<void> {
  await createDirectory(path.dirname(filepath))
  await fsp.writeFile(filepath, data, encoding)
}
