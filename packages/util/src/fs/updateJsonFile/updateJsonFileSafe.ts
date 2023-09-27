import fs from 'fs-extra'
import type { IJFReadOptions } from '../types/IJFReadOptions'
import type { IJsonOutputOptions } from '../types/IJsonOutputOptions'

/**
 * Updates a JSON file based on a provided update function.
 * The update function takes the file's parsed source string as a parameter and should return an object.
 * If the file does not exist or cannot be read, the defaultJson will be used instead.
 *
 * @param filepath - The path to the file to update.
 * @param update - The function to update the file. Takes the current source string as a parameter and should return a string.
 * @param defaultJson - The default string to use if the file cannot be read.
 * @param encoding - The encoding to use when reading and writing the file.
 */

export async function updateJsonFileSafe(
  filepath: string,
  update: (
    src: Record<string | number, unknown>
  ) => Record<string | number, unknown> | Promise<Record<string | number, unknown>>,
  defaultJson: string,
  options?: { read?: IJFReadOptions; write?: IJsonOutputOptions }
): Promise<void> {
  let parsed: Record<string | number, unknown>
  try {
    parsed = await fs.readJson(filepath, options ? options.read : void 0)
  } catch (e) {
    parsed = JSON.parse(defaultJson)
  }
  const retval = await update(parsed)
  await fs.outputJson(filepath, retval, options ? options.write : void 0)
}
