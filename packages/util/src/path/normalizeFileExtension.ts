/**
 * Normalize a file extension to the form: .[ext]
 * Anything before the last "." is not returned.
 * @returns The normalized file extension.
 * @throws If the extension contains illegal characters or is equal to '.'
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
  if (!ext || ext === '.') return ''
  ext = ext.toLowerCase()
  if (!ext.startsWith('.')) ext = '.' + ext
  return ext.substring(ext.lastIndexOf('.'))
}
