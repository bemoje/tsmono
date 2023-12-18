import path from 'path'
import { isWindows } from '../os/isWindows'
import { pathGetSeparator } from './pathGetSeparator'

/**
 * Identical to @see path.dirname, but faster.
 *
 * @param filepath The path to evaluate.
 */
export const pathDirname = isWindows() ? pathDirnameWindows : pathDirnamePosix

/**
 * Identical to @see path.posix.dirname, but faster.
 *
 * @param filepath The path to evaluate.
 */
export function pathDirnamePosix(fspath: string): string {
  if (!fspath || /^[a-z.]/i.test(fspath) || /\\/.test(fspath) || /^[\\/][\\/]/.test(fspath)) {
    return path.posix.dirname(fspath)
  }
  return _getResult(fspath)
}

/**
 * Identical to @see path.win32.dirname, but faster.
 *
 * @param filepath The path to evaluate.
 */
export function pathDirnameWindows(fspath: string): string {
  if (!fspath || /^[\\/][\\/]/.test(fspath) || /^[a-z.]/i.test(fspath)) return path.win32.dirname(fspath)
  return _getResult(fspath)
}

// helper function
function _getResult(fspath: string): string {
  const result = fspath.replace(/[\\/]$/, '').replace(/[\\/][^\\/]+$/, '')
  if (result.length > 2) return result
  if (!result) return pathGetSeparator(fspath)
  if (/^[a-z]:$/i.test(result) && !/^[a-z]:$/i.test(fspath)) return result + pathGetSeparator(fspath)
  return result
}
