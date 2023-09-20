import { JsonReplacerReviver } from './types/JsonReplacerReviver'
import { writeFileSync } from './writeFileSync'

/**
 * Writes data to a JSON file synchronously with pretty formatting.
 *
 * @param filepath - The path to the JSON file.
 * @param data - The data to write to the file.
 * @param replacer - A function that alters the behavior of the stringification process.
 */
export function writePrettyJsonFileSync<T>(
  filepath: string,
  data: T,
  indents = 2,
  replacer?: JsonReplacerReviver
): void {
  writeFileSync(filepath, JSON.stringify(data, replacer, indents))
}
