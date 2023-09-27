import fs from 'fs-extra'

/**
 * Reads the basenames of all FSO's (files/directories/etc.) in a directory.
 * If the directory does not exist, returns undefined.
 *
 * @param dirpath - The path of the directory to read.
 */

export function readDirectoryNamesSafeSync(dirpath: string): string[] | undefined {
  if (!fs.pathExistsSync(dirpath)) return undefined
  return fs.readdirSync(dirpath)
}
