import fs from 'fs-extra'
import { getTempDataPath } from '../../path/getTempDataPath'

/**
 * Asyncrhonously creates a temporary file and deletes it after the callback has finished.
 * @param fileExtension - The file extension to use for the temporary file.
 * @param callback - The callback to execute with the temporary file path. The callback can return a promise and the temporary file will not be deleted until the promise has resolved or rejected.
 */
export async function tempFile(
  fileExtension: string,
  callback: (fpath: string) => void | Promise<void>
): Promise<void> {
  const fpath = getTempDataPath('bemoje', 'temp', Date.now() + fileExtension)
  await fs.ensureFile(fpath)
  try {
    const retval = await callback(fpath)
    fs.remove(fpath)
    return retval
  } catch (error) {
    fs.remove(fpath)
  }
}
