import fs from 'fs-extra'
import type { IJFReadOptions } from '../types/IJFReadOptions'
import type { IJFWriteOptions } from '../types/IJFWriteOptions'

/**
 * Updates a JSON file based on a provided update function.
 * The update function takes the file's current source string as a parameter and should return an object.
 *
 * @param filepath - The path to the file to update.
 * @param update - The function to update the file. Takes the parsed source string as a parameter and should return a string.
 * @param encoding - The encoding to use when reading and writing the file.
 */
export async function updateJsonFile(
  filepath: string,
  update: (
    o: Record<string | number, unknown>
  ) => Record<string | number, unknown> | Promise<Record<string | number, unknown>>,
  options: { read?: IJFReadOptions; write?: IJFWriteOptions } = {}
): Promise<void> {
  const parsed = await fs.readJson(filepath, options.read)
  const retval = await update(parsed)
  await fs.writeJson(filepath, retval, options.write || { spaces: 2 })
}
