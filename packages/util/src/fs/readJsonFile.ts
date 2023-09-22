import { readFile } from './readFile'
import { JsonReplacerReviver } from './types/JsonReplacerReviver'

/**
 * Reads a JSON file asynchronously and returns the parsed JSON data.
 *
 * @param filepath - The path to the JSON file.
 * @param reviver - A function that transforms the results. This function is called for each item.
 * @returns A promise that resolves with the parsed JSON data.
 */
export async function readJsonFile<T>(filepath: string, reviver?: JsonReplacerReviver): Promise<T> {
  const json = await readFile(filepath)
  return JSON.parse(json, reviver)
}
