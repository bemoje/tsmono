import fs from 'fs-extra'

/**
 * Updates a text file based on a provided update function.
 * The update function takes the file's current source string as a parameter and should return a string.
 *
 * @param filepath - The path to the file to update.
 * @param update - The function to update the file. Takes the current source string as a parameter and should return a string.
 * @param encoding - The encoding to use when reading and writing the file.
 */

export function updateFileSync(
  filepath: string,
  update: (src: string) => string,
  encoding: BufferEncoding = 'utf8'
): void {
  const src = fs.readFileSync(filepath, encoding)
  const retval = update(src)
  fs.writeFileSync(filepath, retval, encoding)
}
