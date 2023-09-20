import { readFileSync } from './readFileSync'
import { JsonReplacerReviver } from './types/JsonReplacerReviver'

/**
 * Reads a JSON file synchronously and returns the parsed JSON data.
 *
 * @param filepath - The path to the JSON file.
 * @param reviver - A function that transforms the results. This function is called for each item.
 * @returns The parsed JSON data.
 */
export function readJsonFileSync<T>(filepath: string, reviver?: JsonReplacerReviver): T {
  const json = readFileSync(filepath)
  return JSON.parse(json, reviver)
}
