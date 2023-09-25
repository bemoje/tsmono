import { normalizeFileExtension, pathExtname } from '@bemoje/util'
import { ISearchOptions } from '../ISearchOptions'

export function filterByExtension(results: string[], options: ISearchOptions) {
  const exts = options.extensions.map(normalizeFileExtension)
  return results.filter((fpath) => {
    return exts.includes(normalizeFileExtension(pathExtname(fpath)))
  })
}
