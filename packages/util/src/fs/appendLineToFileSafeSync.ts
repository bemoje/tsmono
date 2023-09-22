import { appendFileSync } from 'fs'
import { dirname } from 'path'
import { createDirectorySync } from './createDirectorySync'

/**
 * Append a line to a file. Creates both the directory and the file if one does not exist.
 * @param filepath The path of the file.
 * @param line The string data to append.
 * @returns A Promise that resolves when the line has been appended to the file.
 */
export function appendLineToFileSafeSync(filepath: string, line: string): void {
  createDirectorySync(dirname(filepath))
  appendFileSync(filepath, line + '\n')
}
