import fs from 'fs-extra'

/**
 * Append a string to a file. Creates the file and dirpath if they do not exist.
 * @param filepath The path of the file.
 * @param string The string data to append.
 * @param options - Options for including a linebreak (EOL) to the string.
 */
export function appendFileSync(filepath: string, string: string, options?: { eol: 'prepend' | 'append' }): void {
  if (options) {
    if (options.eol === 'append') string = string + '\n'
    else if (options.eol === 'prepend') string = '\n' + string
  }
  fs.ensureFileSync(filepath)
  fs.appendFileSync(filepath, string)
}
