import fs from 'fs-extra'
import path from 'path'

/**
 * Reads a fs.Dirent of all FSO's (files/directories/etc.) in a directory.
 * Each FSO's full 'path' is available as a lazy-evaluated getter property on the returned Dirent object.
 *
 * @remarks The fs.Dirent object contains the name of the FSO, and its type (isDirectory, isFile, etc.)
 *
 * @param dirpath - The path of the directory to read.
 */
export function readDirectoryDirentsPathsSync(dirpath: string): Array<fs.Dirent & { get path(): string }> {
  const dirents = fs.readdirSync(dirpath, { withFileTypes: true })
  return dirents.map((dirent) => {
    return Object.defineProperty(dirent, 'path', {
      enumerable: true,
      get() {
        return path.join(dirpath, this.name)
      },
    }) as fs.Dirent & { get path(): string }
  })
}
