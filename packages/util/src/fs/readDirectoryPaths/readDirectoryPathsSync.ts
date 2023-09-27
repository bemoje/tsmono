import fs from 'fs-extra'
import path from 'path'

/**
 * Reads the paths to all FSO's (files/directories/etc.) in a directory.
 *
 * @param dirpath - The path of the directory to read.
 */
export function readDirectoryPathsSync(dirpath: string): string[] {
  return fs.readdirSync(dirpath).map((name) => {
    return path.join(dirpath, name)
  })
}
