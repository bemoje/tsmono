import { readFile, writeFile } from 'fs/promises'

/**
 * Updates a text file asynchronously based on a provided update function.
 * The update function takes the files current source string as a parameter and should return a string.
 *
 * @param filepath - The path to the file to update.
 * @param update - The function to update the file. Takes the current source string as a parameter and should return a string.
 * @param defaultContent - The default string to use if the file cannot be read.
 * @throws if defaultContent is not provded and the file cannot be read.
 * @example ```ts
 * await updateFile('./index.js', (src) => {
 *   return 'console.log("hello world")\n' + src;
 * });
 * ```
 */
export async function updateFile(
  filepath: string,
  update: (src: string) => string | Promise<string>,
  defaultContent?: string
): Promise<void> {
  let src: string
  try {
    src = await readFile(filepath, 'utf8')
  } catch (error) {
    if (!defaultContent) throw error
    src = defaultContent
  }
  const result: string = await update(src)
  if (!result) return
  await writeFile(filepath, result, 'utf8')
}
