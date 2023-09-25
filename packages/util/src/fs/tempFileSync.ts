import { getTempDataPath } from '../path/getTempDataPath'
import { deleteFsoSafe } from './deleteFsoSafe'
import { writeFileSafeSync } from './writeFileSafeSync'

/**
 * Syncrhonously creates a temporary file and deletes it after the callback has finished.
 * @param fileExtension - The file extension to use for the temporary file.
 * @param callback - The callback to execute with the temporary file path. The callback can return a promise and the temporary file will not be deleted until the promise has resolved or rejected.
 */
export function tempFileSync(fileExtension: string, callback: (fpath: string) => void | Promise<void>): void {
  const fpath = getTempDataPath('bemoje', 'temp', Date.now() + fileExtension)
  writeFileSafeSync(fpath, '')
  const rm = () => deleteFsoSafe(fpath)
  try {
    const retval = callback(fpath)
    if (retval instanceof Promise) {
      retval.then(rm).catch(rm)
    } else {
      rm()
    }
  } catch (error) {
    rm()
  }
}
