import { appendFileSync } from 'fs'

/**
 * Append a line to a file. Creates the file if it does not exist.
 * @param filepath The path of the file.
 * @param line The string data to append.
 * @returns A Promise that resolves when the line has been appended to the file.
 * @throws Will throw an error if the parent directory does not exist.
 */
export function appendLineToFileSync(filepath: string, line: string): void {
  appendFileSync(filepath, line + '\n')
}
