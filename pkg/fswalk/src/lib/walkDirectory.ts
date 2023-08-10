import fs from 'fs'
import walkdir from 'walkdir'
import { convertFilter } from './core/convertFilter'
import { IWalkDirectoryOptions } from './types/IWalkDirectoryOptions'

export async function walkDirectory(
  dirpath: string,
  options: IWalkDirectoryOptions = {},
  callback?: (filepath: string, stat: fs.Stats) => void,
): Promise<string[]> {
  const no_return = !!callback
  const return_object = false
  const filter = options.filter ? convertFilter(options.filter) : undefined
  return await walkdir.async(dirpath, { ...options, no_return, return_object, filter }, callback)
}
