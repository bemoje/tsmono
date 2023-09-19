import { gracefulProcessExit } from '@bemoje/commander-config'
import { TrieMap } from '@bemoje/trie-map'
import fs from 'fs'
import fsp from 'fs/promises'
import { FILE_LIST_FILEPATH } from '../../constants/FILE_LIST_FILEPATH'
import { WORD_TRIE_FILEPATH } from '../../constants/WORD_TRIE_FILEPATH'

export async function loadIndex() {
  if (!fs.existsSync(WORD_TRIE_FILEPATH) || !fs.existsSync(FILE_LIST_FILEPATH)) {
    gracefulProcessExit('Index not found. Run `bfind index` to build the index.')
  }
  const PATHS: string[] = JSON.parse(await fsp.readFile(FILE_LIST_FILEPATH, 'utf8'))
  const TRIE: TrieMap<Set<number>> = TrieMap.fromJSON(await fsp.readFile(WORD_TRIE_FILEPATH, 'utf8'))
  return { PATHS, TRIE }
}
