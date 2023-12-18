/**
 * Determines if a given filepath is a relative path in POSIX.
 * @param filepath - The filepath to evaluate.
 * @returns A boolean indicating whether the filepath is a relative path.
 */

export function pathIsRelativePosix(filepath: string): boolean {
  return filepath.charAt(0) !== '/'
}
