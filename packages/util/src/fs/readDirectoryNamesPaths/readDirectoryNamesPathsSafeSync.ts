import fs from 'fs-extra'
import { readDirectoryNamesPathsSync } from './readDirectoryNamesPathsSync'

/**
 * Reads the names of all FSO's (files/directories/etc.) in a directory.
 * Each FSO's full 'path' is available as a lazy-evaluated getter property on the returned object.
 * If the directory does not exist, returns undefined.
 *
 * @param dirpath - The path of the directory to read.
 */

export function readDirectoryNamesPathsSafeSync(
  dirpath: string
): Array<{ name: string; get path(): string }> | undefined {
  if (!fs.pathExistsSync(dirpath)) return undefined
  return readDirectoryNamesPathsSync(dirpath)
}
