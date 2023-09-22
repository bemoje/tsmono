import { IEnsureValidWindowsPathOptions } from './types/IEnsureValidWindowsPathOptions'

/**
 * Assert that a provided windows filesystem path string is valid according to:
 * https://msdn.microsoft.com/en-us/library/windows/desktop/aa365247(v=vs.85).aspx
 * @param path The path to validate.
 * @throws If the path is invalid and the `assert` option is true.
 */
export function assertValidWindowsPath(path: string, options?: IEnsureValidWindowsPathOptions): boolean {
  if (path.length === 0) {
    throw new Error('Path string is length 0.')
  }

  if (path.indexOf('/') !== -1 && path.indexOf('\\') !== -1) {
    throw new Error('Path contains both backslash and forward slash.')
  }

  const maxLength = (options && options.extendedMaxLength ? 32767 : 260) - 12
  if (path.length > maxLength) {
    throw new Error(`Maximum length of ${maxLength} exceeded`)
  }

  const noDriveLetter = /^\w:(\\|\/)/g.test(path) ? path.substring(2) : path
  if (/[<>"|?*:]/g.test(noDriveLetter)) {
    throw new Error(`Illegal characters in: ${path}  |  Illegal characters are: <>"|?:*`)
  }

  if (/(\\|\/)(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])((\\|\/)|$)/g.test(path)) {
    throw new Error('Illegal name in path string')
  }

  return true
}
