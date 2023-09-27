import fs from 'fs-extra'

/**
 * Reads a fs.Dirent of all FSO's (files/directories/etc.) in a directory.
 * If the directory does not exist, returns undefined.
 *
 * @remarks The fs.Dirent object contains the name of the FSO, and its type (isDirectory, isFile, etc.)
 *
 * @param dirpath - The path of the directory to read.
 */

export async function readDirectoryDirentsSafe(dirpath: string): Promise<fs.Dirent[] | undefined> {
  if (!(await fs.pathExists(dirpath))) return undefined
  return await fs.readdir(dirpath, { withFileTypes: true })
}
