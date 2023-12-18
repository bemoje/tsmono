import path from 'path'

/**
 * Returns the first forward- or back-slash found in the given path.
 * If no slash is found, returns the platform-specific path separator.
 *
 * @param filepath The path to evaluate.
 */
export function pathGetSeparator(filepath: string): string {
  const match = filepath.match(/[\\/]/)
  if (!match) return path.sep
  return match[0]
}
