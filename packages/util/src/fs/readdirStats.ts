import fs from 'fs'
import { readdirPaths } from './readdirPaths'

/**
 * Asynchronously reads the paths and stats of all files in a directory.
 *
 * @param dirpath - The path of the directory to read.
 */
export async function readdirStats(dirpath: string): Promise<[fspath: string, stats: fs.Stats][]> {
  const paths = await readdirPaths(dirpath)
  return await Promise.all(
    paths.map(async (fspath) => {
      return [fspath, await fs.promises.stat(fspath)]
    })
  )
}
