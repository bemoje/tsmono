import fs from 'fs'

/**
 * Reads a JSON file from the given filepath and returns its content as a Promise.
 * The Promise will resolve with the parsed JSON content as an object of type T.
 * @template T The expected return type of the JSON object.
 * @param filepath The path to the JSON file to read.
 * @returns A Promise that resolves with the parsed JSON content as an object of type T.
 * @throws Will throw an error if reading the file fails for any reason.
 * @example ```ts
 * const data: MyType = await readJsonFile<MyType>('path/to/myfile.json');
 * ```
 */
export async function readJsonFile<T>(filepath: string): Promise<T> {
  return JSON.parse(await fs.promises.readFile(filepath, 'utf8'))
}
