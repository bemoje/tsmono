/**
 * Normalize a file extension to the form: .[ext]
 * Anything before the last "." is not returned.
 * @returns The normalized file extension.
 * @throws If the extension contains illegal characters.
 * @param ext file extension
 * @example ```ts
 * normalizeFileExtension('jpg');;
 * //=> '.jpg'
 * normalizeFileExtension('.jpg');;
 * //=> '.jpg'
 * normalizeFileExtension('..jpg');;
 * //=> '.jpg'
 * normalizeFileExtension('');;
 * //=> ''
 * normalizeFileExtension('.');;
 * //=> ''
 * normalizeFileExtension('jpg|png');;
 * //=> Error
 * ```
 */
export function normalizeFileExtension(ext: string): string {
  ext = ext.toLowerCase()
  if (ext === '' || ext === '.') return ''
  if (/[<>"|?*:]/g.test(ext)) {
    throw new Error(`Illegal characters in file extension: ${ext}  |  Illegal characters are: <>"|?:*`)
  }
  if (!ext.includes('.')) return '.' + ext
  return ext.substring(ext.lastIndexOf('.'))
}
