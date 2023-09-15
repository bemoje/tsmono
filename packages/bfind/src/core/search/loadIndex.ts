import { TrieMap } from '@bemoje/trie-map'
import fs from 'fs'
import fsp from 'fs/promises'
import { FILE_LIST_PATH } from '../../constants/FILE_LIST_PATH'
import { WORD_TRIE_PATH } from '../../constants/WORD_TRIE_PATH'

export async function loadIndex() {
  if (!fs.existsSync(WORD_TRIE_PATH) || !fs.existsSync(FILE_LIST_PATH)) {
    throw new Error('Index not found. Run `bfind index` to build the index.')
  }
  const PATHS: string[] = JSON.parse(await fsp.readFile(FILE_LIST_PATH, 'utf8'))
  const TRIE: TrieMap<Set<number>> = TrieMap.fromJSON(await fsp.readFile(WORD_TRIE_PATH, 'utf8'))
  return { PATHS, TRIE }
}
