import path from 'path'
import { isWindows } from '../os/isWindows'

export const pathExtname = isWindows() ? pathExtnameWindows : pathExtnamePosix

/**
 * Identical to @see path.win32.extname, but faster.
 *
 * @param filepath The path to evaluate.
 */
export function pathExtnamePosix(fspath: string): string {
  if (/\.$/.test(fspath)) {
    return path.posix.extname(fspath)
  }
  return _getResult(fspath)
}

/**
 * Identical to @see path.win32.extname, but faster.
 *
 * @param filepath The path to evaluate.
 */
export function pathExtnameWindows(fspath: string): string {
  if (/\.$/.test(fspath)) {
    return path.win32.extname(fspath)
  }
  return _getResult(fspath)
}

// helper function
function _getResult(fspath: string): string {
  const matches = /[^\\/]+(\.[^\\/.]+)$/.exec(fspath)
  if (!matches) return ''
  return matches[1] || matches[2] || ''
}
