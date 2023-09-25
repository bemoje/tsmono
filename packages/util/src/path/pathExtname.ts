import { isWindows } from '../os/isWindows'
import { pathExtnamePosix } from './pathExtnamePosix'
import { pathExtnameWindows } from './pathExtnameWindows'

/**
 * Extracts the extension from a given filepath.
 * @param path - The filepath from which to extract the extension.
 * @returns The extension of the filepath.
 */

export const pathExtname: (path: string) => string = isWindows() ? pathExtnameWindows : pathExtnamePosix
