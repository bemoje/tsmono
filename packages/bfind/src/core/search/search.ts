import { colors } from '@bemoje/util'
import { normalizeKeys } from '../normalizeKeys'
import { loadIndex } from './loadIndex'
import { lookupFilepaths } from './lookupFilepaths'
import { lookupIndices } from './lookupIndices'
import { printResults } from './printResults/printResults'

export async function search(keys: string[], options: { printAllResults?: boolean } = {}) {
  const { PATHS, TRIE } = await loadIndex()
  const normalized = normalizeKeys(keys.join(' '), !keys.join(' ').includes('.'))
  console.log('\nSearch keys: ' + [...normalized].map((s) => colors.green(s)).join(', '))
  const indices = lookupIndices(normalized, TRIE)
  const results = lookupFilepaths(normalized, indices, PATHS)
  await printResults(results, normalized, options)
}
