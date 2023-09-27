import fs from 'fs-extra'
import walkdir from 'walkdir'
import { convertFilter } from './core/convertFilter'
import { IWalkDirectoryOptions } from './types/IWalkDirectoryOptions'

export function walkDirectorySync(
  dirpath: string,
  options: IWalkDirectoryOptions = {},
  callback?: (filepath: string, stat: fs.Stats) => void
): string[] {
  const no_return = !!callback
  const return_object = false
  const filter = options.filter ? convertFilter(options.filter) : undefined
  return walkdir.sync(dirpath, { ...options, no_return, return_object, filter }, callback)
}
