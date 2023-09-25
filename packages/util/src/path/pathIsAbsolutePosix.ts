/**
 * Determines if a given filepath is an absolute path in POSIX.
 * @param filepath - The filepath to evaluate.
 * @returns A boolean indicating whether the filepath is an absolute path in POSIX.
 */

export function pathIsAbsolutePosix(filepath: string): boolean {
  return filepath.charAt(0) === '/'
}
