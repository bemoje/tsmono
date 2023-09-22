import { TrieMap } from '@bemoje/trie-map'

export function lookupIndices(keywords: Set<string>, TRIE: TrieMap<Array<number>>): Array<Set<number>> {
  const sets: Array<Set<number>> = []
  for (const kw of keywords) {
    const set: Set<number> = new Set()
    for (const indices of TRIE.values(Array.from(kw))) {
      for (const i of indices) {
        set.add(i)
      }
    }
    sets.push(set)
  }
  return sets
}
