import { TrieMap } from '@bemoje/trie-map'
import fs from 'fs'
import path from 'path'
import { WORD_TRIE_DIRPATH } from '../../constants/WORD_TRIE_DIRPATH'

export async function loadIndexTrie(normalized: Set<string>): Promise<TrieMap<Set<number>>> {
  const TRIE = new TrieMap<Set<number>>()
  const leadChars = new Set([...normalized].map((key) => key.charAt(0)))
  for (const char of leadChars) {
    const fpath = path.join(WORD_TRIE_DIRPATH, char + '.json')
    if (!fs.existsSync(fpath)) continue
    const json = await fs.promises.readFile(fpath, 'utf8')
    TRIE.root[char] = JSON.parse(json, (key, val) => {
      return Array.isArray(val) ? new Set(val) : val
    })
  }
  return TRIE
}
