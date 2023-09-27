import fs from 'fs-extra'

/**
 * Reads the basenames of all FSO's (files/directories/etc.) in a directory.
 * If the directory
 * @param dirpath - The path of the directory to read.
 */
export async function readDirectoryNames(dirpath: string): Promise<string[]> {
  return await fs.readdir(dirpath)
}
