import fs from 'fs'

/**
 * Writes a JSON file to the specified filepath. The data to be written is passed as an argument.
 * If the 'pretty' argument is set to true, the JSON data will be formatted in a more human-readable way.
 * @template T - The type of the data to be written to the file.
 * @param filepath - The path to the file where the data should be written.
 * @param data - The data to be written to the file.
 * @param pretty - Optional. If set to true, formats the JSON data in a more human-readable way. Default is false.
 * @returns A Promise that resolves when the file has been successfully written.
 * @example ```ts
 * const data = { name: 'John', age: 30 };
 * await writeJsonFile('./data.json', data, true);
 * ```
 */
export async function writeJsonFile<T>(filepath: string, data: T, pretty = false): Promise<void> {
  await fs.promises.writeFile(filepath, JSON.stringify(data, null, pretty ? 2 : undefined))
}
