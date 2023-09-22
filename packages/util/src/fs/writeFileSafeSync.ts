import fs from 'fs'
import path from 'path'
import { createDirectorySync } from './createDirectorySync'

/**
 * Writes data to a file synchronously. If the file does not exist, it will be created.
 *
 * @param filepath - The path to the file.
 * @param data - The data to write to the file.
 * @param encoding - The encoding to use when writing the file.
 */
export function writeFileSafeSync(filepath: string, data: string, encoding: BufferEncoding = 'utf8'): void {
  createDirectorySync(path.dirname(filepath))
  fs.writeFileSync(filepath, data, encoding)
}
