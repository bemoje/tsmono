import path from 'path'
import { readdirNamesSafeSync } from './readdirNamesSafeSync'

/**
 * Synchronously reads the paths of all files in a directory.
 *
 * @param dirpath - The path of the directory to read.
 * @returns An array of the paths of all files in the directory if it exists.
 */
export function readdirPathsSafeSync(dirpath: string): string[] | void {
  return readdirNamesSafeSync(dirpath)?.map((name) => path.join(dirpath, name))
}
