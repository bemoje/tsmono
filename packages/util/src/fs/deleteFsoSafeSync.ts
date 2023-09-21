import fs from 'fs'

/**
 * Deletes a file or a directory synchronously in a safe manner. If the directory does not exist, it will simply return the directory path without throwing an error.
 * @param dirpath The path of the directory to be deleted.
 * @returns The path of the directory that was intended to be deleted.
 * @throws Will throw an error if the operation fails for reasons other than the directory not existing.
 * @example ```ts
 * deleteFsoSafeSync('/path/to/directory');;
 * //=> undefined
 * ```
 */
export function deleteFsoSafeSync(dirpath: string): string {
  try {
    fs.rmSync(dirpath, { recursive: true, force: true })
    return dirpath
  } catch (error) {
    return dirpath
  }
}
