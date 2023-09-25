import fs from 'fs'
import path from 'path'
import { deleteFsoSync } from './deleteFsoSync'

/**
 * Synchronously wipes a directory by deleting it and then recreating it.
 *
 * @param dirpath - The path of the directory to wipe.
 */
export function wipeDirectorySync(dirpath: string): void {
  for (const filename of fs.readdirSync(dirpath)) {
    deleteFsoSync(path.join(dirpath, filename))
  }
}
