import { TrieMap } from '@bemoje/trie-map'
import { colors, setUnion } from '@bemoje/util'
const { green } = colors

export function search(keywords: Set<string>, PATHS: string[], TRIE: TrieMap<Set<number>>): Array<string> {
  const indices: Array<Set<number>> = []
  for (const kwset of keywords) {
    const set: Set<number> = new Set()
    TRIE.getValues([...kwset]).forEach((indices: Set<number>) => {
      for (const i of indices) {
        set.add(i)
      }
    })
    indices.push(set)
  }

  const union: Array<number> = [...setUnion(indices)]
  const filepaths: string[] = []
  for (const i of union) {
    const filepath = PATHS[i].toLowerCase()
    let hasAllKeywords = true
    for (const kw of keywords) {
      if (!filepath.includes(kw)) {
        hasAllKeywords = false
        break
      }
    }
    if (!hasAllKeywords) continue
    filepaths.push(PATHS[i].replace(/\\+/g, '/'))
  }

  return filepaths
}
