import fs from 'fs-extra'
import { readDirectoryNamesPaths } from './readDirectoryNamesPaths'

/**
 * Reads the names of all FSO's (files/directories/etc.) in a directory.
 * Each FSO's full 'path' is available as a lazy-evaluated getter property on the returned object.
 * If the directory does not exist, returns undefined.
 *
 * @param dirpath - The path of the directory to read.
 */

export async function readDirectoryNamesPathsSafe(
  dirpath: string
): Promise<Array<{ name: string; get path(): string }> | undefined> {
  if (!(await fs.pathExists(dirpath))) return undefined
  return await readDirectoryNamesPaths(dirpath)
}
