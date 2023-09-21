import { readFile } from './readFile'
import { writeFile } from './writeFile'

/**
 * Updates a text file asynchronously based on a provided update function.
 * The update function takes the files current source string as a parameter and should return a string.
 * If defaultContent is provided, a file is created if it does not exist. If not provided and the file does not exist, nothing is done and the callback is not called.
 *
 * @param filepath - The path to the file to update.
 * @param update - The function to update the file. Takes the current source string as a parameter and should return a string.
 * @param defaultContent - The default string to use if the file cannot be read.
 * @throws if defaultContent is not provded and the file cannot be read.
 * @example ```ts
 * await updateFileSafe('./index.js', (src) => {
 *   return 'console.log("hello world")\n' + src;
 * });
 * ```
 */
export async function updateFileSafe(
  filepath: string,
  update: (src: string) => string | Promise<string>,
  defaultContent?: string
): Promise<void> {
  let src: string
  try {
    src = await readFile(filepath)
  } catch (error) {
    if (!defaultContent) return
    src = defaultContent
  }
  const retval = await update(src)
  if (!retval) return
  await writeFile(filepath, retval)
}
