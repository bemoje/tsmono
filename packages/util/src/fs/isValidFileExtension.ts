/**
 * Check if a file extension is valid.
 *
 * @param ext - The file extension to check.
 */

export function isValidFileExtension(ext: string): boolean {
  return !!ext && ext !== '.' && !/[<>"|?*:]/.test(ext)
}
