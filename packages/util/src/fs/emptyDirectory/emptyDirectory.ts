import fs from 'fs-extra'
import { readDirectoryStats } from '../readDirectoryStats/readDirectoryStats'

/**
 * Ensures that a directory is empty. Deletes directory contents if the directory is not empty.
 * If the directory does not exist, it is created.
 * The directory itself is not deleted.
 *
 * Pass a predicate function to remove only certain files from the directory.
 *
 * @param dirpath - The path of the directory to wipe.
 * @param predicate - If the function returns true for a file, that file is removed from the directory.
 */
export async function emptyDirectory(
  dirpath: string,
  predicate?: (stats: fs.Stats & { name: string; get path(): string }) => boolean | Promise<boolean>
): Promise<void> {
  if (!predicate) return await fs.emptyDir(dirpath)
  for (const stats of await readDirectoryStats(dirpath)) {
    if (await predicate(stats)) await fs.remove(stats.path)
  }
}
