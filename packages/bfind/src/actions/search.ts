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

export async function search(keys: string[], o: ISearchOptions = {}): Promise<void> {
  // print options
  if (!o.pipe && Object.keys(o).length) console.log(o)

  // load data
  const normalized = normalizeSearchKeys(keys)
  const TRIE = await loadIndexTrie(normalized)
  const FILEPATHS = await loadIndexPaths()

  // search index
  const indices = lookupIndices(normalized, TRIE)
  let results = lookupFilepaths(keys, indices, FILEPATHS)

  // filter result
  if (o.extensions) results = filterByExtension(results, o)
  if (o.dir || o.cwd) results = filterByDirectory(results, o)
  if (o.fterms) results = await filterByFileContents(results, o)

  // print result
  if (o.pipe) return printResultsUnformatted(results)
  await printResults(results, keys)
}
