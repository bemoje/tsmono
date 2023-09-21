import { createDirectory } from './createDirectory'
import { deleteFsoSafe } from './deleteFsoSafe'

/**
 * Asynchronously wipes a directory safely by deleting it and then recreating it.
 * This function is safe because it checks if the directory exists before trying to delete it.
 *
 * @param dirpath - The path of the directory to wipe.
 * @returns A promise that resolves when the directory has been wiped.
 */
export async function wipeDirectorySafe(dirpath: string): Promise<void> {
  await deleteFsoSafe(dirpath)
  await createDirectory(dirpath)
}
