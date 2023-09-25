import fs from 'fs'
import path from 'path'
import { createDirectory } from './createDirectory'
import { deleteFso } from './deleteFso'

/**
 * Asynchronously wipes a directory safely by deleting it and then recreating it.
 * This function is safe because it checks if the directory exists before trying to delete it.
 *
 * @param dirpath - The path of the directory to wipe.
 * @returns A promise that resolves when the directory has been wiped.
 */
export async function wipeDirectorySafe(dirpath: string): Promise<void> {
  if (!fs.existsSync(dirpath)) {
    await createDirectory(dirpath)
    return
  }
  for (const filename of await fs.promises.readdir(dirpath)) {
    await deleteFso(path.join(dirpath, filename))
  }
}
