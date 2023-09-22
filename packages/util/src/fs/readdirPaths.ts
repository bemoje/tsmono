import fsp from 'fs/promises'
import path from 'path'

/**
 * Asynchronously reads the paths of all files in a directory.
 *
 * @param dirpath - The path of the directory to read.
 * @returns A promise that resolves with an array of the paths of all files in the directory.
 */
export async function readdirPaths(dirpath: string): Promise<string[]> {
  return (await fsp.readdir(dirpath)).map((name) => path.join(dirpath, name))
}
