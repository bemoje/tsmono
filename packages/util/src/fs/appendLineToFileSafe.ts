import { appendFile } from 'fs/promises'
import { dirname } from 'path'
import { createDirectory } from './createDirectory'

/**
 * Append a line to a file. Creates both the directory and the file if one does not exist.
 * @param filepath The path of the file.
 * @param line The string data to append.
 * @returns A Promise that resolves when the line has been appended to the file.
 */
export async function appendLineToFileSafe(filepath: string, line: string): Promise<void> {
  await createDirectory(dirname(filepath))
  await appendFile(filepath, line + '\n')
}
