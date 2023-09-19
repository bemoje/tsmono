import { ISearchOptions } from './search/ISearchOptions'
import { loadIndex } from './search/loadIndex'
import { lookupFilepaths } from './search/lookupFilepaths'
import { lookupIndices } from './search/lookupIndices'
import { normalizeSearchKeys } from './search/normalizeSearchKeys'
import { printResults } from './search/printResults/printResults'
import { printSearchKeys } from './search/printSearchKeys'

export async function search(keys: string[], options: ISearchOptions = {}): Promise<void> {
  const normalized = normalizeSearchKeys(keys)
  printSearchKeys(normalized)
  const { PATHS, TRIE } = await loadIndex()
  const indices = lookupIndices(normalized, TRIE)
  const results = lookupFilepaths(normalized, indices, PATHS)
  await printResults(results, normalized, options)
}
