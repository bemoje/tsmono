import fs from 'fs-extra'
import path from 'path'

/**
 * Reads the paths to all FSO's (files/directories/etc.) in a directory.
 *
 * @param dirpath - The path of the directory to read.
 */
export async function readDirectoryPaths(dirpath: string): Promise<string[]> {
  return (await fs.readdir(dirpath)).map((name) => {
    return path.join(dirpath, name)
  })
}
