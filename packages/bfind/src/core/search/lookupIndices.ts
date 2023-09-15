import { TrieMap } from '@bemoje/trie-map'

export function lookupIndices(keywords: Set<string>, TRIE: TrieMap<Set<number>>): Array<Set<number>> {
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
  return indices
}
