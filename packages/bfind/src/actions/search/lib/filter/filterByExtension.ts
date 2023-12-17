import { ISearchOptions } from '../ISearchOptions'
import { normalizeFileExtension, pathExtname } from '@bemoje/util'

export function filterByExtension(results: string[], options: ISearchOptions) {
  const exts = options.extensions?.map(normalizeFileExtension)
  if (!exts) return results
  return results.filter((fpath) => {
    return exts.includes(normalizeFileExtension(pathExtname(fpath)))
  })
}
