import fs from 'fs'
import path from 'path'

export function convertFilter(
  filter: (fullpath: string, stat: fs.Stats) => boolean,
): (directory: string, files: string[]) => string[] | Promise<string[]> {
  return (directory: string, files: string[]): string[] => {
    return files.filter((filename: string) => {
      const absolute = path.join(directory, filename)
      return filter(absolute, fs.statSync(absolute))
    })
  }
}
