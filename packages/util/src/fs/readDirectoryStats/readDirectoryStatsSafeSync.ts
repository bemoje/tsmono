import fs from 'fs-extra'
import { readDirectoryStatsSync } from './readDirectoryStatsSync'

/**
 * Reads a fs.Stats of all FSO's (files/directories/etc.) in a directory.
 * Each FSO's 'name' and full 'path' are available as lazy-evaluated getter properties on the returned Stats object.
 * If the directory does not exist, returns undefined.
 *
 * @param dirpath - The path of the directory to read.
 */

export function readDirectoryStatsSafeSync(
  dirpath: string
): Array<fs.Stats & { name: string; get path(): string }> | undefined {
  if (!fs.pathExistsSync(dirpath)) return undefined
  return readDirectoryStatsSync(dirpath)
}
