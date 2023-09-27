import fs from 'fs-extra'
import { readDirectoryStats } from './readDirectoryStats'

/**
 * Reads a fs.Stats of all FSO's (files/directories/etc.) in a directory.
 * Each FSO's 'name' and full 'path' are available as lazy-evaluated getter properties on the returned Stats object.
 * If the directory does not exist, returns undefined.
 *
 * @param dirpath - The path of the directory to read.
 */

export async function readDirectoryStatsSafe(
  dirpath: string
): Promise<Array<fs.Stats & { name: string; get path(): string }> | undefined> {
  if (!(await fs.pathExists(dirpath))) return undefined
  return await readDirectoryStats(dirpath)
}
