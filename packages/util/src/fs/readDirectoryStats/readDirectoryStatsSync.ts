import fs from 'fs-extra'
import path from 'path'

/**
 * Reads a fs.Stats of all FSO's (files/directories/etc.) in a directory.
 * Each FSO's 'name' and full 'path' are available as lazy-evaluated getter properties on the returned Stats object.
 *
 * @param dirpath - The path of the directory to read.
 */
export function readDirectoryStatsSync(dirpath: string): Array<fs.Stats & { name: string; get path(): string }> {
  const names = fs.readdirSync(dirpath)
  return names.map((name) => {
    const stats = fs.statSync(path.join(dirpath, name))
    return Object.defineProperties(stats, {
      name: {
        enumerable: true,
        value: name,
      },
      path: {
        enumerable: true,
        get() {
          return path.join(dirpath, this.name)
        },
      },
    }) as fs.Stats & { name: string; get path(): string }
  })
}
