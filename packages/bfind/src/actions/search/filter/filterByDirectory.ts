import path from 'path'
import { ISearchOptions } from '../ISearchOptions'

export function filterByDirectory(results: string[], options: ISearchOptions) {
  const dir = path.resolve(options.dir || process.cwd())
  return results.filter((fpath) => {
    return path.normalize(fpath).startsWith(dir)
  })
}
