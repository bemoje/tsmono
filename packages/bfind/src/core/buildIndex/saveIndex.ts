import { TrieMap } from '@bemoje/trie-map'
import fsp from 'fs/promises'
import path from 'path'
import { FILE_LIST_PATH } from '../../constants/FILE_LIST_PATH'
import { WORD_TRIE_PATH } from '../../constants/WORD_TRIE_PATH'
import { SerializableSet } from '../../util/SerializableSet'

export async function saveIndex(PATHS: string[], TRIE: TrieMap<SerializableSet<number>>): Promise<void> {
  await fsp.mkdir(path.dirname(WORD_TRIE_PATH), { recursive: true })
  await fsp.writeFile(WORD_TRIE_PATH, TRIE.toJson(false), 'utf8')
  await fsp.writeFile(FILE_LIST_PATH, JSON.stringify(PATHS), 'utf8')
}
