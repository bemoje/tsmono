import fs from 'fs'
import path from 'path'
import { createDirectory } from './createDirectory'

/**
 * Append a line to a file. Creates the file if it does not exist.
 * @param filepath The path of the file.
 * @param line The string data to append.
 * @returns A Promise that resolves when the line has been appended to the file.
 * @throws Will throw an error if the operation fails.
 * @example ```ts
 * await appendLineToFile('/path/to/file', 'This is a new line')
 * ```
 */
export async function appendLineToFile(filepath: string, line: string, linebreakBefore = false): Promise<void> {
  if (!fs.existsSync(filepath)) {
    await createDirectory(path.dirname(filepath))
    await fs.promises.writeFile(filepath, '')
  }
  await fs.promises.appendFile(filepath, linebreakBefore ? '\n' + line : line + '\n')
}
