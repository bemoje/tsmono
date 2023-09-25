import fs from 'fs'
import { readdirPathsSync } from './readdirPathsSync'

/**
 * Synchronously reads the paths and stats of all files in a directory.
 *
 * @param dirpath - The path of the directory to read.
 */
export function readdirStatsSync(dirpath: string): [fspath: string, stats: fs.Stats][] {
  return readdirPathsSync(dirpath).map((fspath) => {
    return [fspath, fs.statSync(fspath)]
  })
}
