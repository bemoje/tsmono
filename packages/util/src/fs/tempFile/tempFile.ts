import fs from 'fs-extra'
import { Any } from '../../types/Any'
import { getTempDataPath } from '../../path/getTempDataPath'
import { strEnsureStartsWith } from '../../string/strEnsureStartsWith'

/**
 * Asyncrhonously creates a temporary file and deletes it after the callback has finished.
 * @param fileExtension - The file extension to use for the temporary file.
 * @param callback - The callback to execute with the temporary file path. The callback can return a promise and the temporary file will not be deleted until the promise has resolved or rejected.
 */
export async function tempFile(fileExtension: string, callback: (fpath: string) => Any | Promise<Any>) {
  const fpath = getTempDataPath('temp', Date.now() + strEnsureStartsWith(fileExtension, '.'))
  await fs.ensureFile(fpath)
  try {
    const retval = await callback(fpath)
    fs.remove(fpath)
    return retval
  } catch (error) {
    fs.remove(fpath)
  }
}
