import fs from 'fs'
import path from 'path'

/**
 * Synchronously reads the paths of all files in a directory.
 *
 * @param dirpath - The path of the directory to read.
 * @returns An array of the paths of all files in the directory.
 */
export function readdirPathsSync(dirpath: string): string[] {
  return fs.readdirSync(dirpath).map((name) => path.join(dirpath, name))
}
