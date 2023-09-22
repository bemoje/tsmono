import { createDirectory } from './createDirectory'
import { deleteFso } from './deleteFso'

/**
 * Asynchronously wipes a directory by deleting it and then recreating it.
 *
 * @param dirpath - The path of the directory to wipe.
 * @returns A promise that resolves when the directory has been wiped.
 */
export async function wipeDirectory(dirpath: string): Promise<void> {
  await deleteFso(dirpath)
  await createDirectory(dirpath)
}
