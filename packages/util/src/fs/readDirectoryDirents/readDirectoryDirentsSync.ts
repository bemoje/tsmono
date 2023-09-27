import fs from 'fs-extra'

/**
 * Reads a fs.Dirent of all FSO's (files/directories/etc.) in a directory.
 *
 * @remarks The fs.Dirent object contains the name of the FSO, and its type (isDirectory, isFile, etc.)
 *
 * @param dirpath - The path of the directory to read.
 */
export function readDirectoryDirentsSync(dirpath: string): fs.Dirent[] {
  return fs.readdirSync(dirpath, { withFileTypes: true })
}
