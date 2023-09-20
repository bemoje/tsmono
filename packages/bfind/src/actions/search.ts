import { filterByDirectory } from './search/filter/filterByDirectory'
import { filterByExtension } from './search/filter/filterByExtension'
import { filterByFileContents } from './search/filter/filterByFileContents'
import { ISearchOptions } from './search/ISearchOptions'
import { loadIndexPaths } from './search/loadIndexPaths'
import { loadIndexTrie } from './search/loadIndexTrie'
import { lookupFilepaths } from './search/lookupFilepaths'
import { lookupIndices } from './search/lookupIndices'
import { normalizeSearchKeys } from './search/normalizeSearchKeys'
import { printResults } from './search/printResults/printResults'
import { printResultsUnformatted } from './search/printResults/printResultsUnformatted'

export async function search(keys: string[], options: ISearchOptions = {}): Promise<void> {
  if (!options.pipe && Object.keys(options).length) console.log(options)

  const normalized = normalizeSearchKeys(keys)
  const [FILEPATHS, TRIE] = await Promise.all([loadIndexPaths(), loadIndexTrie(normalized)])
  const indices = lookupIndices(normalized, TRIE)
  let results = lookupFilepaths(keys, indices, FILEPATHS)

  if (options.extensions) results = filterByExtension(results, options)
  if (options.dir || options.cwd) results = filterByDirectory(results, options)
  if (options.fterms) return filterByFileContents(results, options)
  if (options.pipe) return printResultsUnformatted(results)
  await printResults(results, keys)
}
