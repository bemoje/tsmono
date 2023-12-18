import fs from 'fs-extra'
import path from 'path'

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
export function emptyDirectorySync(
  dirpath: string,
  predicate?: (stats: fs.Stats & { name: string; path: string }) => boolean
): void {
  if (!predicate) return fs.emptyDirSync(dirpath)
  for (const name of fs.readdirSync(dirpath)) {
    const fspath = path.join(dirpath, name)
    const stats = fs.statSync(fspath)
    if (predicate(Object.assign(stats, { name, path: fspath }))) {
      fs.removeSync(fspath)
    }
  }
}
