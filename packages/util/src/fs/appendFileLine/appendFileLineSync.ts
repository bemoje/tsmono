import fs from 'fs-extra'

/**
 * Append a line to a file. Creates the file and path if they do not exist.
 * @param filepath The path of the file.
 * @param line The string data to append.
 */
export function appendFileLineSync(filepath: string, line: string): void {
  fs.ensureFileSync(filepath)
  fs.appendFileSync(filepath, line + '\n')
}
