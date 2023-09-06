import { setUnion } from '@bemoje/set'
import { TrieMap } from '@bemoje/trie-map'
import { colors } from '@bemoje/util'
import { words } from 'lodash'
import { extractSearchKeys } from './extractSearchKeys'
const { green } = colors
export function search(searchString: string, PATHS: string[], TRIE: TrieMap<Set<number>>): Array<string> {
  const keywords: Set<string> = extractSearchKeys(searchString)
  console.log(
    'Search keys: ' +
      Array.from(keywords)
        .map((s) => green(s))
        .join(', ')
  )

  const indices: Array<Set<number>> = []
  for (const keyword of keywords) {
    const set: Set<number> = new Set()
    TRIE.getValues(Array.from(keyword)).forEach((indices: Set<number>) => {
      for (const i of indices) {
        set.add(i)
      }
    })
    indices.push(set)
  }

  const union: Array<number> = Array.from(setUnion(indices))
  const searchWords = words(searchString)
  const filepaths: string[] = []
  for (const i of union) {
    const filepath = PATHS[i]
    let hasAllKeywords = true
    for (const kw of searchWords) {
      if (!filepath.includes(kw)) {
        hasAllKeywords = false
        break
      }
    }
    if (!hasAllKeywords) continue
    filepaths.push(filepath.replace(/\\+/g, '/'))
  }

  return filepaths
}
