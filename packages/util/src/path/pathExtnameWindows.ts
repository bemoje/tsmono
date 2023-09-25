/**
 * Extracts the extension from a given filepath in Windows.
 * @param filepath - The filepath from which to extract the extension.
 * @returns The extension of the filepath.
 */

export function pathExtnameWindows(filepath: string): string {
  const matches = /(\.[^./\\]*|)(?:[\\/]*)$/.exec(filepath)
  if (!matches) return ''
  return matches[1]
}
