import fs from 'fs'
import { readdirPathsSafeSync } from './readdirPathsSafeSync'

/**
 * Synchronously reads the paths and stats of all files in a directory.
 *
 * @param dirpath - The path of the directory to read.
 */
export function readdirStatsSafeSync(dirpath: string): [fspath: string, stats: fs.Stats][] | void {
  return readdirPathsSafeSync(dirpath)?.map((fspath) => {
    return [fspath, fs.statSync(fspath)]
  })
}
