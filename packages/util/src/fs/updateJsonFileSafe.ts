import fs from 'fs'
import { getJsonIndentation } from './getJsonIndentation'
import { writeJsonFileSafe } from './writeJsonFileSafe'

/**
 * Updates a JSON file asynchronously based on a provided update function.
 * The update function takes the current JSON object as a parameter and should return the updated JSON object.
 * If the update function returns a falsy value, the JSON file will not be written to.
 * The indentation of the original JSON file is preserved.
 *
 * @param filepath - The path to the JSON file to update.
 * @param update - The function to update the JSON object. Takes the current JSON object as a parameter and should return the updated JSON object.
 * @param defaultJson - The default JSON string to use if the file cannot be read.
 * @example ```ts
 * await updateJsonFileSafe('./package.json', (json) => {
 *   json.version = '1.0.1';
 *   return json;
 * });
 * ```
 */
export async function updateJsonFileSafe(
  filepath: string,
  update: (o: Record<string, unknown>) => Record<string, unknown> | Promise<Record<string, unknown>>,
  defaultJson: string
): Promise<void> {
  let json: string
  let parsed: Record<string, unknown>
  try {
    json = await fs.promises.readFile(filepath, 'utf8')
    parsed = JSON.parse(json)
  } catch (error) {
    json = defaultJson
    parsed = JSON.parse(json)
  }
  const result: Record<string, unknown> = await update(parsed)
  await writeJsonFileSafe(filepath, result, getJsonIndentation(json))
}
