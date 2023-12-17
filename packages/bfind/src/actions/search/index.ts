import { CommandBuilder } from '@bemoje/cli'
import { filterByDirectory } from './lib/filter/filterByDirectory'
import { filterByExtension } from './lib/filter/filterByExtension'
import { filterByFileContents } from './lib/filter/filterByFileContents'
import { ISearchOptions } from './lib/ISearchOptions'
import { loadIndexPaths } from './lib/loadIndexPaths'
import { loadIndexTrie } from './lib/loadIndexTrie'
import { lookupFilepaths } from './lib/lookupFilepaths'
import { lookupIndices } from './lib/lookupIndices'
import { normalizeSearchKeys } from './lib/normalizeSearchKeys'
import { printResults } from './lib/printResults/printResults'
import { printResultsUnformatted } from './lib/printResults/printResultsUnformatted'

export async function search(keys: string[], o: ISearchOptions = {}, cmd: CommandBuilder): Promise<void> {
  // print options
  if (!o.pipe && Object.keys(o).length) console.log(o)

  // load data
  const normalized = normalizeSearchKeys(cmd, keys)
  const TRIE = await loadIndexTrie(normalized)
  const FILEPATHS = await loadIndexPaths()

  // search index
  const indices = lookupIndices(normalized, TRIE)
  let results = lookupFilepaths(cmd, keys, indices, FILEPATHS)

  // filter result
  if (o.extensions) results = filterByExtension(results, o)
  if (o.dir || o.cwd) results = filterByDirectory(results, o)
  if (o.fileSearchTerms) results = await filterByFileContents(results, o)

  // print result
  if (o.pipe) return printResultsUnformatted(results)
  await printResults(cmd, results, keys)
}
