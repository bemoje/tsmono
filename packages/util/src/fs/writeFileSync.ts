import fs from 'fs'

/**
 * Writes data to a file synchronously.
 *
 * @param filepath - The path to the file.
 * @param data - The data to write to the file.
 * @param encoding - The encoding to use when writing the file.
 */
export function writeFileSync(filepath: string, data: string, encoding: BufferEncoding = 'utf8'): void {
  fs.writeFileSync(filepath, data, encoding)
}
