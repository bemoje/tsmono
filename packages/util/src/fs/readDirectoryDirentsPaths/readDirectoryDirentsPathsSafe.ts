import fs from 'fs-extra'
import { readDirectoryDirentsPaths } from './readDirectoryDirentsPaths'

/**
 * Reads a fs.Dirent of all FSO's (files/directories/etc.) in a directory.
 * Each FSO's full 'path' is available as a lazy-evaluated getter property on the returned Dirent object.
 * If the directory does not exist, returns undefined-
 *
 * @remarks The fs.Dirent object contains the name of the FSO, and its type (isDirectory, isFile, etc.)
 *
 * @param dirpath - The path of the directory to read.
 */

export async function readDirectoryDirentsPathsSafe(
  dirpath: string
): Promise<Array<fs.Dirent & { get path(): string }> | undefined> {
  if (!(await fs.pathExists(dirpath))) return undefined
  return await readDirectoryDirentsPaths(dirpath)
}
