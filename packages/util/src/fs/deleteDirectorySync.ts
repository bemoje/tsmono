import fs from 'fs'

/**
 * Deletes a directory synchronously.
 * @remarks This function uses Node.js's `fs.rmSync` method with the options `{ recursive: true, force: true }`.
 * @param dirpath The path of the directory to delete.
 * @returns The path of the deleted directory.
 * @throws Will throw an error if the directory does not exist or if the process lacks permissions to delete it.
 * @example ```ts
 * deleteDirectorySync('/path/to/directory');;
 * //=> undefined
 * ```
 */
export function deleteDirectorySync(dirpath: string): string {
  fs.rmSync(dirpath, { recursive: true, force: true })
  return dirpath
}
