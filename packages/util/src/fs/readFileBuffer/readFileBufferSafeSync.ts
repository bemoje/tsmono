import fs from 'fs-extra'

/**
 * Reads a file and returns the file's contents.
 *
 * Identical to @see fs.readFileSync, except that:
 * - it uses no encoding by default
 * - if operation fails, returns undefined instead of throwing
 *
 * @param filepath - The path to the file.
 */
export function readFileBufferSafeSync(filepath: string): Buffer | undefined {
  try {
    return fs.readFileSync(filepath)
  } catch (error) {
    return undefined
  }
}
