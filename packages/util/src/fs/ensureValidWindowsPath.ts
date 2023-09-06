import { IEnsureValidWindowsPathOptions } from './types/IEnsureValidWindowsPathOptions'

/**
 * Check whether a provided windows filesystem path string is valid according to:
 * https://msdn.microsoft.com/en-us/library/windows/desktop/aa365247(v=vs.85).aspx
 * @param path The path to validate.
 * @returns A boolean indicating whether the path is valid. If the `assert` option is true, the function will throw an error instead of returning false.
 * @throws Will throw an error if the `assert` option is true and the path is invalid.
 * @param options An optional object that may contain the following properties:
 *   - `assert`: If true, the function will throw an error if the path is invalid. Default is false.
 *   - `extendedMaxLength`: If true, the function will allow paths up to 32767 characters long. Default is false.
 * @example ```ts
 * ensureValidWindowsPath('C:\\Users\\User\\Documents\\file.txt');;
 * //=> true
 * ensureValidWindowsPath('C:/Users/User/Documents/file.txt');;
 * //=> false
 * ensureValidWindowsPath('C:\\Users\\User\\Documents\\file.txt', { assert: true });;
 * //=> throws an error
 * ensureValidWindowsPath('C:\\Users\\User\\Documents\\file.txt', { extendedMaxLength: true });;
 * //=> true
 * ```
 */
export function ensureValidWindowsPath(path: string, options?: IEnsureValidWindowsPathOptions): boolean {
  const throwOrFalse = (msg: string) => {
    if (options && options.assert === true) {
      throw new Error(`Invalid windows path. ${msg}  |  input received: ${path}`)
    }
    return false
  }

  if (path.length === 0) {
    return throwOrFalse('Path string is length 0.')
  }

  if (path.indexOf('/') !== -1 && path.indexOf('\\') !== -1) {
    return throwOrFalse('Path contains both backslash and forward slash.')
  }

  const maxLength = (options && options.extendedMaxLength ? 32767 : 260) - 12
  if (path.length > maxLength) {
    return throwOrFalse(`Maximum length of ${maxLength} exceeded`)
  }

  let noDriveLetter = path
  if (/^\w:(\\|\/)/g.test(path)) {
    noDriveLetter = path.substring(2)
  }
  if (/[<>"|?*:]/g.test(noDriveLetter)) {
    return throwOrFalse(`Illegal characters in: ${path}  |  Illegal characters are: <>"|?:*`)
  }

  if (/(\\|\/)(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])((\\|\/)|$)/g.test(path)) {
    return throwOrFalse('Illegal name in path string')
  }

  return true
}
