import fs from 'fs-extra'

/**
 * Create a directory at a given path if it does not exist.
 * Automatically creates parent directories if they do not exist.
 * @param dirpath The path where the directory should be created.
 * @returns The path of the directory.
 */
export function createDirectorySync(dirpath: string): string {
  fs.ensureDirSync(dirpath)
  return dirpath
}
