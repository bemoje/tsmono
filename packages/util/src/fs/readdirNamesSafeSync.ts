import fs from 'fs'

/**
 * Synchronously reads the names of all files in a directory.
 *
 * @param dirpath - The path of the directory to read.
 * @returns An array of the names of all files in the directory if it exists.
 */
export function readdirNamesSafeSync(dirpath: string): string[] | void {
  if (!fs.existsSync(dirpath)) return
  return fs.readdirSync(dirpath)
}
