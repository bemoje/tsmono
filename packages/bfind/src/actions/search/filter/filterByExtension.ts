import { normalizeFileExtension } from '@bemoje/util'
import path from 'path'
import { ISearchOptions } from '../ISearchOptions'

export function filterByExtension(results: string[], options: ISearchOptions) {
  const exts = options.extensions.map(normalizeFileExtension)
  return results.filter((fpath) => {
    return exts.includes(normalizeFileExtension(path.extname(fpath)))
  })
}
