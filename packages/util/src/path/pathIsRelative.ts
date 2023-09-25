import { isWindows } from '../os/isWindows'
import { pathIsRelativePosix } from './pathIsRelativePosix'
import { pathIsRelativeWindows } from './pathIsRelativeWindows'

/**
 * Determines if a given filepath is a relative path.
 * @param filepath - The filepath to evaluate.
 * @returns A boolean indicating whether the filepath is a relative path.
 */

export const pathIsRelative: (filepath: string) => boolean = isWindows() ? pathIsRelativeWindows : pathIsRelativePosix
