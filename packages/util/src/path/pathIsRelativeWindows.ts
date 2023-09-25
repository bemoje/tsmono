import { pathIsUnc } from '../path/pathIsUnc'

/**
 * Determines if a given filepath is a relative path in Windows.
 * @param filepath - The filepath to evaluate.
 * @returns A boolean indicating whether the filepath is a relative path.
 */

export function pathIsRelativeWindows(filepath: string): boolean {
  return !pathIsUnc(filepath) && !/^([a-z]:)?[\\/]/i.test(filepath)
}
