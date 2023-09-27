import fs from 'fs-extra'
import { readDirectoryPathsSync } from './readDirectoryPathsSync'

/**
 * Reads the paths to all FSO's (files/directories/etc.) in a directory.
 * If the directory does not exist, returns undefined.
 *
 * @param dirpath - The path of the directory to read.
 */

export function readDirectoryPathsSafeSync(dirpath: string): string[] | undefined {
  if (!fs.pathExistsSync(dirpath)) return undefined
  return readDirectoryPathsSync(dirpath)
}
