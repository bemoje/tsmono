import path from 'path'
import { readdirNamesSafe } from './readdirNamesSafe'

/**
 * Asynchronously reads the paths of all files in a directory.
 *
 * @param dirpath - The path of the directory to read.
 * @returns A promise that resolves with an array of the paths of all files in the directory if it exists.
 */
export async function readdirPathsSafe(dirpath: string): Promise<string[] | void> {
  return (await readdirNamesSafe(dirpath))?.map((name) => path.join(dirpath, name))
}
