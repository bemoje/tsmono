import fs from 'fs-extra'
import path from 'path'

/**
 * Reads the names of all FSO's (files/directories/etc.) in a directory.
 * Each FSO's full 'path' is available as a lazy-evaluated getter property on the returned object.
 *
 * @param dirpath - The path of the directory to read.
 */
export function readDirectoryNamesPathsSync(dirpath: string): Array<{ name: string; get path(): string }> {
  return fs.readdirSync(dirpath).map((name) => {
    return Object.defineProperty({ name }, 'path', {
      enumerable: true,
      get() {
        return path.join(dirpath, this.name)
      },
    }) as { name: string; get path(): string }
  })
}
