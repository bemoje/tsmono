import { createDirectorySync } from './createDirectorySync'
import { deleteFsoSync } from './deleteFsoSync'

/**
 * Synchronously wipes a directory by deleting it and then recreating it.
 *
 * @param dirpath - The path of the directory to wipe.
 */
export function wipeDirectorySync(dirpath: string): void {
  deleteFsoSync(dirpath)
  createDirectorySync(dirpath)
}
