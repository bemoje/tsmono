import fs from 'fs-extra'
import { IReadJsonFileOptions } from '../types/IReadJsonFileOptions'

/**
 * Reads a JSON file and then parses it into an object.
 * If an error occurs, it returns undefined.
 *
 * @param filepath - The path to the JSON file.
 * @param options - Options for reading the JSON file.
 */
export async function readJsonFileSafe<T>(filepath: string, options: IReadJsonFileOptions): Promise<T | void> {
  try {
    return await fs.readJson(filepath, options)
  } catch (error) {
    return
  }
}
