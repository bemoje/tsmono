import path from 'path'

/**
 * Gets the root directory of a path.
 *
 * @param dirpath - The path to get the root directory of.
 */
export function getRootDir(dirpath: string = process.cwd()): string {
  return path.parse(dirpath).root
}
