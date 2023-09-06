import fs from 'fs'

/**
 * Deletes a directory and all of its contents.
 * @remarks This function uses Node.js's `fs.promises.rm` method with the `recursive` and `force` options set to `true`.
 * This means it will delete the directory and all of its contents, even if the directory is not empty.
 * @param dirpath The path to the directory to delete.
 * @returns A Promise that resolves when the directory has been deleted.
 * @throws Will throw an error if the directory does not exist, or if there was a problem deleting the directory.
 * @example ```ts
 * deleteDirectory('/path/to/directory');
 * ```
 */
export async function deleteDirectory(dirpath: string): Promise<void> {
  await fs.promises.rm(dirpath, { recursive: true, force: true })
}
