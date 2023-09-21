import { JsonReplacerReviver } from './types/JsonReplacerReviver'
import { writeFileSafeSync } from './writeFileSafeSync'

/**
 * Writes data to a JSON file synchronously. If the file does not exist, it will be created.
 *
 * @param filepath - The path to the JSON file.
 * @param data - The data to write to the file.
 * @param replacer - A function that alters the behavior of the stringification process.
 */
export function writeJsonFileSafeSync<T>(
  filepath: string,
  data: T,
  indents?: number,
  replacer?: JsonReplacerReviver
): void {
  writeFileSafeSync(filepath, JSON.stringify(data, replacer, indents))
}