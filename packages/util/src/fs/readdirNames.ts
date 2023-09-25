import fs from 'fs'

/**
 * Asynchronously reads the names of all files in a directory.
 *
 * @param dirpath - The path of the directory to read.
 * @returns A promise that resolves with an array of the names of all files in the directory.
 */
export async function readdirNames(dirpath: string): Promise<string[]> {
  return await fs.promises.readdir(dirpath)
}
