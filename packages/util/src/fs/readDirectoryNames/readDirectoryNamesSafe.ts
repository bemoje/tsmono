import fs from 'fs-extra'

/**
 * Reads the basenames of all FSO's (files/directories/etc.) in a directory.
 * If the directory does not exist, returns undefined.
 *
 * @param dirpath - The path of the directory to read.
 */

export async function readDirectoryNamesSafe(dirpath: string): Promise<string[] | undefined> {
  if (!(await fs.pathExists(dirpath))) return undefined
  return await fs.readdir(dirpath)
}
