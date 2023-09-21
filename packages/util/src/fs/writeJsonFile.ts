import { JsonReplacerReviver } from './types/JsonReplacerReviver'
import { writeFile } from './writeFile'

/**
 * Writes data to a JSON file asynchronously.
 *
 * @param filepath - The path to the JSON file.
 * @param data - The data to write to the file.
 * @param replacer - A function that alters the behavior of the stringification process.
 * @returns A promise that resolves when the file has been written.
 */
export async function writeJsonFile<T>(
  filepath: string,
  data: T,
  indents?: number,
  replacer?: JsonReplacerReviver
): Promise<void> {
  await writeFile(filepath, JSON.stringify(data, replacer, indents))
}
