import { createDirectorySync } from './createDirectorySync'
import { deleteFsoSafeSync } from './deleteFsoSafeSync'

/**
 * Synchronously wipes a directory safely by deleting it and then recreating it.
 * This function is safe because it checks if the directory exists before trying to delete it.
 *
 * @param dirpath - The path of the directory to wipe.
 */
export function wipeDirectorySafeSync(dirpath: string): void {
  deleteFsoSafeSync(dirpath)
  createDirectorySync(dirpath)
}
