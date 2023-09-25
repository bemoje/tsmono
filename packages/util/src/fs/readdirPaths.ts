import path from 'path'
import { readdirNames } from './readdirNames'

/**
 * Asynchronously reads the paths of all files in a directory.
 *
 * @param dirpath - The path of the directory to read.
 * @returns A promise that resolves with an array of the paths of all files in the directory.
 */
export async function readdirPaths(dirpath: string): Promise<string[]> {
  return (await readdirNames(dirpath)).map((name) => path.join(dirpath, name))
}
