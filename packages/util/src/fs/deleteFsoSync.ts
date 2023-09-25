import fs from 'fs'

/**
 * Deletes a file or a directory synchronously.
 * @remarks This function uses Node.js's `fs.rmSync` method with the options `{ recursive: true, force: true }`.
 * @param dirpath The path of the directory to delete.
 * @throws Will throw an error if the directory does not exist or if the process lacks permissions to delete it.
 */
export function deleteFsoSync(dirpath: string): void {
  fs.rmSync(dirpath, { recursive: true, force: true })
}
