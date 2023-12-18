import fs from 'fs-extra'
import path from 'path'
import { config } from '../../config'

/**
 * This function creates directories.
 * @param preset - The preset string.
 * @returns - The directories.
 */
export function createDirectories(preset: string) {
  const filedir = path.join(config.data.directory, preset)
  const jsondir = path.join(filedir, 'json')
  const textdir = path.join(filedir, 'text')
  fs.mkdirSync(jsondir, { recursive: true })
  fs.mkdirSync(textdir, { recursive: true })
  return { jsondir, textdir }
}
