import fs from 'fs-extra'
import path from 'path'

/**
 * Reads the names of all FSO's (files/directories/etc.) in a directory.
 * Each FSO's full 'path' is available as a lazy-evaluated getter property on the returned object.
 *
 * @param dirpath - The path of the directory to read.
 */
export async function readDirectoryNamesPaths(dirpath: string): Promise<Array<{ name: string; get path(): string }>> {
  return (await fs.readdir(dirpath)).map((name) => {
    return Object.defineProperty({ name }, 'path', {
      enumerable: true,
      get() {
        return path.join(dirpath, this.name)
      },
    }) as { name: string; get path(): string }
  })
}
