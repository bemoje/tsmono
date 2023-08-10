import fs from 'fs'
import { WalkOptions } from 'walkdir'

export interface IWalkDirectoryOptions extends Omit<WalkOptions, 'filter' | 'no_return'> {
  filter?: (fullpath: string, stat: fs.Stats) => boolean
}
