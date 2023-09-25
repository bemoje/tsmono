import { isWindows } from '../os/isWindows'
import { pathIsAbsolutePosix } from './pathIsAbsolutePosix'
import { pathIsAbsoluteWindows } from './pathIsAbsoluteWindows'

/**
 * Determines if a given filepath is an absolute path.
 * @param filepath - The filepath to evaluate.
 * @returns A boolean indicating whether the filepath is an absolute path in Windows.
 */

export const pathIsAbsolute: (filepath: string) => boolean = isWindows() ? pathIsAbsoluteWindows : pathIsAbsolutePosix
