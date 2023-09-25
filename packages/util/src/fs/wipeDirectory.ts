import fs from 'fs'
import path from 'path'
import { deleteFso } from './deleteFso'

/**
 * Asynchronously wipes a directory by deleting it and then recreating it.
 *
 * @param dirpath - The path of the directory to wipe.
 * @returns A promise that resolves when the directory has been wiped.
 */
export async function wipeDirectory(dirpath: string): Promise<void> {
  for (const filename of await fs.promises.readdir(dirpath)) {
    await deleteFso(path.join(dirpath, filename))
  }
}
