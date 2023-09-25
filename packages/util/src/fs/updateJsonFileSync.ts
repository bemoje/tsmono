import fs from 'fs'
import { getJsonIndentation } from './getJsonIndentation'
import { writeJsonFileSafeSync } from './writeJsonFileSafeSync'

/**
 * Updates a JSON file synchronously based on a provided update function.
 * The update function takes the current JSON object as a parameter and should return the updated JSON object.
 * If the update function returns a falsy value, the JSON file will not be written to.
 * The indentation of the original JSON file is preserved.
 *
 * @param filepath - The path to the JSON file to update.
 * @param update - The function to update the JSON object. Takes the current JSON object as a parameter and should return the updated JSON object.
 * @param defaultJson - The default JSON string to use if the file cannot be read.
 * @throws if defaultJson is not provded and the file cannot be read.
 * @example ```ts
 * updateJsonFileSync('./package.json', (json) => {
 *   json.version = '1.0.1';
 *   return json;
 * });
 * ```
 */
export function updateJsonFileSync(
  filepath: string,
  update: (o: Record<string, unknown>) => Record<string, unknown>,
  defaultJson?: string
): void {
  let json: string
  try {
    json = fs.readFileSync(filepath, 'utf8')
  } catch (error) {
    if (!defaultJson) throw error
    json = defaultJson
  }
  const result: Record<string, unknown> = update(JSON.parse(json))
  writeJsonFileSafeSync(filepath, result, getJsonIndentation(json))
}
