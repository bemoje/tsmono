import { JsonReplacerReviver } from './types/JsonReplacerReviver'
import { writeJsonFileSafeSync } from './writeJsonFileSafeSync'

/**
 * Writes data to a JSON file synchronously with pretty formatting. If the file does not exist, it will be created.
 *
 * @param filepath - The path to the JSON file.
 * @param data - The data to write to the file.
 * @param replacer - A function that alters the behavior of the stringification process.
 */
export function writePrettyJsonFileSafeSync<T>(
  filepath: string,
  data: T,
  indents = 2,
  replacer?: JsonReplacerReviver
): void {
  writeJsonFileSafeSync(filepath, data, indents, replacer)
}
