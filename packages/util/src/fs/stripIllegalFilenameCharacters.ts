/**
 * Removes illegal characters from a filename: / \ ? % * : | " < >
 *
 * @param string The filename to strip.
 */
export function stripIllegalFilenameCharacters(string: string) {
  return string.replace(/[/\\?%*:|"<>]/g, '')
}
