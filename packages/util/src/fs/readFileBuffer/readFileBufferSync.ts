import fs from 'fs-extra'

/**
 * Reads a file and returns the file's contents.
 *
 * Identical to @see fs.readFileSync, except that it uses no encoding by default
 *
 * @param filepath - The path to the file.
 */
export function readFileBufferSync(filepath: string): Buffer | undefined {
  return fs.readFileSync(filepath)
}
