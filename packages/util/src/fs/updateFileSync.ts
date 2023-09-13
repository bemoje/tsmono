import fs from 'fs'

/**
 * Updates a text file synchronously based on a provided update function.
 * The update function takes the files current source string as a parameter and should return a string.
 *
 * @param filepath - The path to the file to update.
 * @param update - The function to update the file. Takes the current source string as a parameter and should return a string.
 * @param defaultContent - The default string to use if the file cannot be read.
 * @throws if defaultContent is not provded and the file cannot be read.
 * @example ```ts updateFileSync('./index.js', (src) => {
 *   return 'console.log("hello world")\n' + src;
 * });
 * ```
 */
export function updateFileSync(filepath: string, update: (src: string) => string, defaultContent?: string): void {
  let src: string
  try {
    src = fs.readFileSync(filepath, 'utf8')
  } catch (error) {
    if (!defaultContent) throw error
    src = defaultContent
  }
  const result: string = update(src)
  if (!result) return
  fs.writeFileSync(filepath, result, 'utf8')
}
