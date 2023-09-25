import fs from 'fs'
import { readdirPathsSafe } from './readdirPathsSafe'

/**
 * Asynchronously reads the paths and stats of all files in a directory.
 *
 * @param dirpath - The path of the directory to read.
 */
export async function readdirStatsSafe(dirpath: string): Promise<[fspath: string, stats: fs.Stats][] | void> {
  const paths = await readdirPathsSafe(dirpath)
  if (!paths) return
  return await Promise.all(
    paths.map(async (fspath) => {
      return [fspath, await fs.promises.stat(fspath)]
    })
  )
}
