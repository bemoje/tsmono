import path from 'path'
import { isWindows } from '../os/isWindows'

/**
 * Identical to @see path.basename, but faster.
 *
 * @param filepath The path to evaluate.
 */
export const pathRoot = isWindows() ? pathRootWindows : pathRootPosix

/**
 * Identical to @see path.posix.basename, but faster.
 *
 * @param filepath The path to evaluate.
 */
export function pathRootPosix(fspath: string): string {
  if (/^[a-z]:/i.test(fspath) || /\\/.test(fspath) || /^[\\/][\\/]/.test(fspath)) {
    return path.posix.parse(fspath).root
  }
  return _getResult(fspath)
}

/**
 * Identical to @see path.win32.basename, but faster.
 *
 * @param filepath The path to evaluate.
 */
export function pathRootWindows(fspath: string): string {
  return _getResult(fspath)
}

// helper function
function _getResult(fspath: string): string {
  const match = /^([a-zA-Z]:|[\\/]{2}[^\\/]+[\\/]+[^\\/]+)?([\\/])?/.exec(fspath)
  if (!match) return ''
  return match[0]
}
