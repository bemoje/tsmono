import { regexEscapeString } from '@bemoje/util'
import path from 'path'
import walkdir from 'walkdir'
import { convertFilter } from './core/convertFilter'
import { IWalkDirectoryOptions } from './types/IWalkDirectoryOptions'

export async function findFile(
  dirpath: string,
  search: string,
  options: IWalkDirectoryOptions = {}
): Promise<string | undefined> {
  search = search.replace(/\\|\//g, path.sep)
  const regSearch = new RegExp(regexEscapeString(search), 'i')
  const filter = options.filter ? convertFilter(options.filter) : undefined
  return await new Promise((resolve, reject) => {
    const emitter = walkdir(dirpath, { ...options, no_return: true, filter }) as walkdir.WalkEmitter
    emitter.on('file', (filepath: string) => {
      if (regSearch.test(filepath)) {
        emitter.end()
        resolve(filepath)
      }
    })
    emitter.on('end', () => resolve(undefined))
    emitter.on('error', (error) => reject(error))
  })
}
