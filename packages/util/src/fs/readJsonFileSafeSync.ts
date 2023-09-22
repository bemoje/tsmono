import { readFileSync } from './readFileSync'
import { JsonReplacerReviver } from './types/JsonReplacerReviver'

/**
 * Reads a JSON file synchronously and returns the parsed JSON data. If an error occurs, it returns undefined.
 *
 * @param filepath - The path to the JSON file.
 * @param reviver - A function that transforms the results. This function is called for each item.
 * @returns The parsed JSON data or undefined if an error occurs.
 */
export function readJsonFileSafeSync<T>(filepath: string, reviver?: JsonReplacerReviver): T | void {
  try {
    const json = readFileSync(filepath)
    return JSON.parse(json, reviver)
  } catch (error) {
    return
  }
}
