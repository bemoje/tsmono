import fs from 'fs-extra'
import { readDirectoryDirentsPathsSync } from './readDirectoryDirentsPathsSync'

/**
 * Reads a fs.Dirent of all FSO's (files/directories/etc.) in a directory.
 * Each FSO's full 'path' is available as a lazy-evaluated getter property on the returned Dirent object.
 * If the directory does not exist, returns undefined.
 *
 * @remarks The fs.Dirent object contains the name of the FSO, and its type (isDirectory, isFile, etc.)
 *
 * @param dirpath - The path of the directory to read.
 */

export function readDirectoryDirentsPathsSafeSync(
  dirpath: string
): Array<fs.Dirent & { get path(): string }> | undefined {
  if (!fs.pathExistsSync(dirpath)) return undefined
  return readDirectoryDirentsPathsSync(dirpath)
}
