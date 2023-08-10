import walkdir from 'walkdir'
import { convertFilter } from './core/convertFilter'
import { IWalkDirectoryOptions } from './types/IWalkDirectoryOptions'

export function walkDirectoryEmitter(dirpath: string, options: IWalkDirectoryOptions = {}): walkdir.WalkEmitter {
  const filter = options.filter ? convertFilter(options.filter) : undefined
  return walkdir(dirpath, { ...options, no_return: true, filter }) as walkdir.WalkEmitter
}
