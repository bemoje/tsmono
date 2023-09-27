import fs from 'fs-extra'

/**
 * Reads a fs.Dirent of all FSO's (files/directories/etc.) in a directory.
 * If the directory does not exist, returns undefined.
 *
 * @remarks The fs.Dirent object contains the name of the FSO, and its type (isDirectory, isFile, etc.)
 *
 * @param dirpath - The path of the directory to read.
 */

export function readDirectoryDirentsSafeSync(dirpath: string): fs.Dirent[] | undefined {
  if (!fs.pathExistsSync(dirpath)) return undefined
  return fs.readdirSync(dirpath, { withFileTypes: true })
}
