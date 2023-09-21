import fs from 'fs'

/**
 * Synchronously reads the names of all files in a directory.
 *
 * @param dirpath - The path of the directory to read.
 * @returns An array of the names of all files in the directory.
 */
export function readdirNamesSync(dirpath: string): string[] {
  return fs.readdirSync(dirpath)
}
