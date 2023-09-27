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

export async function updateFileSafe(
  filepath: string,
  update: (src: string) => string | Promise<string>,
  defaultContent = '',
  encoding: BufferEncoding = 'utf8'
): Promise<void> {
  let src: string
  try {
    src = await fs.readFile(filepath, encoding)
  } catch (e) {
    src = defaultContent
  }
  const retval = await update(src)
  await fs.outputFile(filepath, retval, encoding)
}
