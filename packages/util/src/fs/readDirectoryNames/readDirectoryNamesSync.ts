import fs from 'fs-extra'

/**
 * Reads the basenames of all FSO's (files/directories/etc.) in a directory.
 *
 * @param dirpath - The path of the directory to read.
 */
export function readDirectoryNamesSync(dirpath: string): string[] {
  return fs.readdirSync(dirpath)
}
