import fs from 'fs'
import os from 'os'
import path from 'path'

/**
 * Creates a temporary file and deletes it after the callback has finished.
 * @param fileExtension - The file extension to use for the temporary file.
 * @param callback - The callback to execute with the temporary file path. The callback can return a promise and the temporary file will not be deleted until the promise has resolved or rejected.
 */
export function tempFile(fileExtension: string, callback: (fpath: string) => void | Promise<void>): void {
  const dir = path.join(os.tmpdir(), 'bemoje', 'temp')
  const fpath = path.join(dir, Date.now() + fileExtension)
  fs.mkdirSync(dir, { recursive: true })
  const prom = callback(fpath)
  if (prom instanceof Promise) {
    const rm = () => fs.rmSync(fpath)
    prom.then(rm).catch(rm)
  } else {
    fs.rmSync(fpath)
  }
}
