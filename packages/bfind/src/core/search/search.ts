import { ISearchOptions } from './ISearchOptions'
import { loadIndex } from './loadIndex'
import { lookupFilepaths } from './lookupFilepaths'
import { lookupIndices } from './lookupIndices'
import { normalizeSearchKeys } from './normalizeSearchKeys'
import { printResults } from './printResults/printResults'
import { printSearchKeys } from './printSearchKeys'

export async function search(keys: string[], options: ISearchOptions = {}): Promise<void> {
  const normalized = normalizeSearchKeys(keys)
  printSearchKeys(normalized)
  const { PATHS, TRIE } = await loadIndex()
  const indices = lookupIndices(normalized, TRIE)
  const results = lookupFilepaths(normalized, indices, PATHS)
  await printResults(results, normalized, options)
}
