import fs from 'fs-extra'
import { getTempDataPath } from '../../path/getTempDataPath'

/**
 * Syncrhonously creates a temporary file and deletes it after the callback has finished.
 * @param fileExtension - The file extension to use for the temporary file.
 * @param callback - The callback to execute with the temporary file path. The callback can return a promise and the temporary file will not be deleted until the promise has resolved or rejected.
 */
export function tempFileSync(fileExtension: string, callback: (fpath: string) => void): void {
  const fpath = getTempDataPath('bemoje', 'temp', Date.now() + fileExtension)
  fs.ensureFileSync(fpath)
  try {
    const retval = callback(fpath)
    fs.remove(fpath)
    return retval
  } catch (error) {
    fs.remove(fpath)
  }
}
