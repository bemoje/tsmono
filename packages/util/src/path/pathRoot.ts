/**
 * Extracts the root of a given filepath.
 * @param filepath - The filepath from which to extract the root.
 * @returns The root of the filepath. If no match is found, an empty string is returned.
 */
export function pathRoot(filepath: string): string {
  const match = /^([a-zA-Z]:|[\\/]{2}[^\\/]+[\\/]+[^\\/]+)?([\\/])?/.exec(filepath)
  if (!match) return ''
  return match[0]
}
