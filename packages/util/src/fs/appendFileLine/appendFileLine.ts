import fs from 'fs-extra'

/**
 * Append a line to a file. Creates the file and dirpath if they do not exist.
 * @param filepath The path of the file.
 * @param line The string data to append.
 */
export async function appendFileLine(filepath: string, line: string): Promise<void> {
  await fs.ensureFile(filepath)
  await fs.appendFile(filepath, line + '\n')
}
