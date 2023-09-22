import { readFile } from './readFile'
import { JsonReplacerReviver } from './types/JsonReplacerReviver'

/**
 * Reads a JSON file asynchronously and returns the parsed JSON data. If an error occurs, it returns undefined.
 *
 * @param filepath - The path to the JSON file.
 * @param reviver - A function that transforms the results. This function is called for each item.
 * @returns A promise that resolves with the parsed JSON data or undefined if an error occurs.
 */
export async function readJsonFileSafe<T>(filepath: string, reviver?: JsonReplacerReviver): Promise<T | void> {
  try {
    const json = await readFile(filepath)
    return JSON.parse(json, reviver)
  } catch (error) {
    return
  }
}
