import fs from 'fs-extra'
import os from 'os'
import path from 'path'

/**
 * Returns a path to the os tmpdir location.
 *
 * @param paths - The paths to join to the os tmpdir location.
 */
export function getTempDataPath(...paths: string[]): string {
  return path.join(tempdir, ...paths)
}

const tempdir = fs.realpathSync(os.tmpdir())
