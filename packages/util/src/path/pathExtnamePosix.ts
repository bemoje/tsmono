/**
 * Extracts the extension from a given filepath in POSIX.
 * @param path - The filepath from which to extract the extension.
 * @returns The extension of the filepath.
 */

export function pathExtnamePosix(path: string): string {
  const matches = /((?:\.{1,2}|[^/]+?|)(\.[^./]*|))(?:[/]*)$/.exec(path)
  if (!matches) return ''
  return matches[2]
}
