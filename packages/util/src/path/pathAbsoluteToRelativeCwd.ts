import path from 'path'
import { regexEscapeString } from '../regex/regexEscapeString'

/**
 * If the filepath is somewhere in the current working directory, it can be converted into a relative path.
 * @remarks This function takes an absolute path as input and returns a relative path. It replaces the current working directory in the path with an empty string,
 * replaces all backslashes with forward slashes, and removes any leading forward slashes.
 * @param workingDirectory The directory relative to which the path should be converted. Defaults to the current working directory.
 * @returns The relative path.
 * @param absolute the absolute filepath to convert.
 * @example ```ts
 * pathAbsoluteToRelativeCwd(__filename)
 * //=> 'src/pathAbsoluteToRelativeCwd.ts'
 * ```
 */
export function pathAbsoluteToRelativeCwd(absolute: string, workingDirectory = process.cwd()): string {
  absolute = path.normalize(absolute)
  if (absolute === workingDirectory) return './'
  return absolute.replace(new RegExp(regexEscapeString(path.normalize(workingDirectory) + path.sep), 'i'), '')
}
