import fs from 'fs-extra'

/**
 * Updates a text file based on a provided update function.
 * The update function takes the file's current source string as a parameter and should return a string.
 * If the file does not exist or cannot be read, the defaultContent will be used instead.
 *
 * @param filepath - The path to the file to update.
 * @param update - The function to update the file. Takes the current source string as a parameter and should return a string.
 * @param defaultContent - The default string to use if the file cannot be read.
 * @param encoding - The encoding to use when reading and writing the file.
 */

export function updateFileSafeSync(
  filepath: string,
  update: (src: string) => string,
  defaultContent = '',
  encoding: BufferEncoding = 'utf8'
): void {
  let src: string
  try {
    src = fs.readFileSync(filepath, encoding)
  } catch (e) {
    src = defaultContent
  }
  const retval = update(src)
  fs.outputFileSync(filepath, retval, encoding)
}
