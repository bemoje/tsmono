import { isWindows } from '../os/isWindows'
import { pathIsRelativeWindows } from './pathIsRelativeWindows'

/**
 * Determines if a given filepath is an absolute path.
 * @param filepath - The filepath to evaluate.
 * @returns A boolean indicating whether the filepath is an absolute path in Windows.
 */

export const pathIsAbsolute: (filepath: string) => boolean = isWindows() ? pathIsAbsoluteWindows : pathIsAbsolutePosix

/**
 * Determines if a given filepath is an absolute path in POSIX.
 * @param filepath - The filepath to evaluate.
 * @returns A boolean indicating whether the filepath is an absolute path in POSIX.
 */
export function pathIsAbsolutePosix(filepath: string): boolean {
  return filepath.charAt(0) === '/'
}

/**
 * Determines if a given filepath is an absolute path in Windows.
 * @param filepath - The filepath to evaluate.
 * @returns A boolean indicating whether the filepath is an absolute path in Windows.
 */
export function pathIsAbsoluteWindows(filepath: string): boolean {
  return /^([\\/]|[a-zA-Z]:)[\\/]/.test(filepath) || !pathIsRelativeWindows(filepath)
}
