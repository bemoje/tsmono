import fs from 'fs'

/**
 * Create a directory at a given path if it does not exist.
 * Automatically creates parent directories if they do not exist.
 * @param dirpath The path where the directory should be created.
 * @returns The path of the directory.
 * @example ```ts
 * createDirectorySync('/path/to/directory')
 * ```
 */
export function createDirectorySync(dirpath: string): string {
  fs.mkdirSync(dirpath, { recursive: true })
  return dirpath
}
