import fs from 'fs'
import path from 'path'
import { createDirectorySync } from './createDirectorySync'
import { deleteFsoSync } from './deleteFsoSync'

/**
 * Synchronously wipes a directory safely by deleting it and then recreating it.
 * This function is safe because it checks if the directory exists before trying to delete it.
 *
 * @param dirpath - The path of the directory to wipe.
 */
export function wipeDirectorySafeSync(dirpath: string): void {
  if (!fs.existsSync(dirpath)) {
    createDirectorySync(dirpath)
    return
  }
  for (const filename of fs.readdirSync(dirpath)) {
    deleteFsoSync(path.join(dirpath, filename))
  }
}
