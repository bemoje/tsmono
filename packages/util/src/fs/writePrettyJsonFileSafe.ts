import { JsonReplacerReviver } from './types/JsonReplacerReviver'
import { writeFileSafe } from './writeFileSafe'

/**
 * Writes data to a JSON file asynchronously with pretty formatting. If the file does not exist, it will be created.
 *
 * @param filepath - The path to the JSON file.
 * @param data - The data to write to the file.
 * @param replacer - A function that alters the behavior of the stringification process.
 * @returns A promise that resolves when the file has been written.
 */
export async function writePrettyJsonFileSafe<T>(
  filepath: string,
  data: T,
  indents = 2,
  replacer?: JsonReplacerReviver
): Promise<void> {
  await writeFileSafe(filepath, JSON.stringify(data, replacer, indents))
}
