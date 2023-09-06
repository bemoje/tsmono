import path from 'path'
import { normalizeFileExtension } from './normalizeFileExtension'

/**
 * Takes a list of file extensions and returns a filter function that returns true if a filepath/filename passed to it contains one of the given file extensions.
 * @remarks If no file extensions are provided, the filter will always return true.
 * @returns A function that takes a filepath and returns true if the filepath has one of the specified file extensions, false otherwise.
 * @param fileExtensions file extensions
 * @example ```ts
 * createFileExtensionFilter('.ts', '.tsx')('index.ts');;
 * //=> true
 * createFileExtensionFilter('.ts', '.tsx')('index.js');;
 * //=> false
 * ```
 */
export function createFileExtensionFilter(...fileExtensions: string[]): (filepath: string) => boolean {
  if (!fileExtensions.length) return () => true
  return (filepath: string) => {
    for (const ext of fileExtensions.map(normalizeFileExtension)) {
      if (path.extname(filepath) === ext) {
        return true
      }
    }
    return false
  }
}
