import { pathIsRelativeWindows } from './pathIsRelativeWindows'

/**
 * Determines if a given filepath is an absolute path in Windows.
 * @param filepath - The filepath to evaluate.
 * @returns A boolean indicating whether the filepath is an absolute path in Windows.
 */

export function pathIsAbsoluteWindows(filepath: string): boolean {
  return /^([\\/]|[a-zA-Z]:)[\\/]/.test(filepath) || !pathIsRelativeWindows(filepath)
}
