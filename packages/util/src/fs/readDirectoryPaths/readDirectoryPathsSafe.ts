import fs from 'fs-extra'
import { readDirectoryPaths } from './readDirectoryPaths'

/**
 * Reads the paths to all FSO's (files/directories/etc.) in a directory.
 * If the directory does not exist, returns undefined.
 *
 * @param dirpath - The path of the directory to read.
 */

export async function readDirectoryPathsSafe(dirpath: string): Promise<string[] | undefined> {
  if (!(await fs.pathExists(dirpath))) return undefined
  return await readDirectoryPaths(dirpath)
}
