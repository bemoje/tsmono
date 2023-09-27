import path from 'path'
import { isWindows } from '../os/isWindows'

/**
 * Identical to @see path.basename, but faster.
 *
 * @param filepath The path to evaluate.
 */
export const pathBasename = isWindows() ? pathBasenameWindows : pathBasenamePosix

/**
 * Identical to @see path.posix.basename, but faster.
 *
 * @param filepath The path to evaluate.
 */
export function pathBasenamePosix(fspath: string): string {
  if (/^[a-z.]/i.test(fspath) || /\\/.test(fspath) || fspath.startsWith('.')) {
    return path.posix.basename(fspath)
  }
  return _getResult(fspath)
}

/**
 * Identical to @see path.win32.basename, but faster.
 *
 * @param filepath The path to evaluate.
 */
export function pathBasenameWindows(fspath: string): string {
  if (/^[a-z.]/i.test(fspath)) return path.win32.basename(fspath)
  return _getResult(fspath)
}

// helper function
function _getResult(fspath: string): string {
  const matches = /[\\/]([^\\/]+)[\\/]?$/.exec(fspath)
  if (!matches) return ''
  return matches[1]
}
