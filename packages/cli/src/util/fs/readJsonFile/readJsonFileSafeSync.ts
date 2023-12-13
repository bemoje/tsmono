import fs from 'fs-extra'
import type { IReadJsonFileOptions } from '../types/IReadJsonFileOptions'

/**
 * Reads a JSON file and then parses it into an object.
 * If an error occurs, it returns undefined.
 *
 * @param filepath - The path to the JSON file.
 * @param options - Options for reading the JSON file.
 */
export function readJsonFileSafeSync<T>(filepath: string, options?: IReadJsonFileOptions): T | undefined {
  try {
    return fs.readJsonSync(filepath, options) as T
  } catch (error) {
    return undefined
  }
}
